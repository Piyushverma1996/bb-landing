import crypto from "crypto";

// Minimal Google service-account OAuth (JWT bearer flow).
// Hand-rolled with node:crypto so we don't add a dependency to the production base.
// Set GOOGLE_SA_EMAIL and GOOGLE_SA_PRIVATE_KEY (the full PEM, \n escaped) in Vercel.

const SA_EMAIL = process.env.GOOGLE_SA_EMAIL ?? "";
const SA_KEY = (process.env.GOOGLE_SA_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");

export const GOOGLE_SA_CONFIGURED = Boolean(SA_EMAIL && SA_KEY);

const b64url = (input: string | Buffer) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

// Keyed by scope string. A single shared slot would hand the Analytics-scoped
// token to a Search Console call and fail with ACCESS_TOKEN_SCOPE_INSUFFICIENT.
const cache = new Map<string, { token: string; exp: number }>();

/** Why the last getAccessToken call failed. Diagnostic only - never contains the key. */
export let lastAuthError = "";

/** Shape check on the PEM so a bad paste gives a precise message, not "invalid grant". */
function keyShapeProblem(): string {
  if (!SA_KEY.includes("-----BEGIN PRIVATE KEY-----"))
    return "GOOGLE_SA_PRIVATE_KEY is missing the -----BEGIN PRIVATE KEY----- header. Copy the whole private_key value from the JSON.";
  if (!SA_KEY.includes("-----END PRIVATE KEY-----"))
    return "GOOGLE_SA_PRIVATE_KEY is truncated - the -----END PRIVATE KEY----- footer is missing.";
  if (SA_KEY.trimStart().startsWith('"') || SA_KEY.trimEnd().endsWith('"'))
    return "GOOGLE_SA_PRIVATE_KEY still has the surrounding double quotes from the JSON. Remove them.";
  if (!SA_KEY.includes("\n"))
    return "GOOGLE_SA_PRIVATE_KEY has no line breaks. Paste the value with its \\n sequences intact, or as real multi-line text.";
  if (!SA_EMAIL.includes("@") || !SA_EMAIL.endsWith(".iam.gserviceaccount.com"))
    return "GOOGLE_SA_EMAIL does not look like a service account address (should end in .iam.gserviceaccount.com).";
  return "";
}

/** Returns an access token for the given scopes, cached until ~1 min before expiry. */
export async function getAccessToken(scopes: string[]): Promise<string | null> {
  if (!GOOGLE_SA_CONFIGURED) return null;
  const now = Math.floor(Date.now() / 1000);
  const cacheKey = scopes.join(" ");
  const hit = cache.get(cacheKey);
  if (hit && hit.exp > now + 60) return hit.token;

  lastAuthError = keyShapeProblem();
  if (lastAuthError) return null;

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: SA_EMAIL,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  }));

  let signature: string;
  try {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(`${header}.${claim}`);
    signature = b64url(signer.sign(SA_KEY));
  } catch (err) {
    lastAuthError = `Could not sign with the private key (it is malformed): ${err instanceof Error ? err.message : err}`;
    console.error(lastAuthError);
    return null;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${header}.${claim}.${signature}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      // Google's message here is precise and safe to surface (e.g. "Invalid JWT
      // Signature", "account not found"). It never echoes the key.
      lastAuthError = `Google rejected the credentials (${res.status}): ${(await res.text()).slice(0, 300)}`;
      console.error(lastAuthError);
      return null;
    }
    const d = await res.json();
    cache.set(cacheKey, { token: d.access_token, exp: now + (d.expires_in ?? 3600) });
    lastAuthError = "";
    return d.access_token as string;
  } catch (err) {
    lastAuthError = `Network error reaching Google: ${err instanceof Error ? err.message : err}`;
    console.error(lastAuthError);
    return null;
  }
}

export const SCOPES = {
  analytics: ["https://www.googleapis.com/auth/analytics.readonly"],
  searchConsole: ["https://www.googleapis.com/auth/webmasters.readonly"],
  indexing: ["https://www.googleapis.com/auth/indexing"],
};
