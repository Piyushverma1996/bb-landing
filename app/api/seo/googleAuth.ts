import crypto from "crypto";

// Minimal Google service-account OAuth (JWT bearer flow).
// Hand-rolled with node:crypto so we don't add a dependency to the production base.
// Set GOOGLE_SA_EMAIL and GOOGLE_SA_PRIVATE_KEY (the full PEM, \n escaped) in Vercel.

const SA_EMAIL = process.env.GOOGLE_SA_EMAIL ?? "";
const SA_KEY = (process.env.GOOGLE_SA_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");

export const GOOGLE_SA_CONFIGURED = Boolean(SA_EMAIL && SA_KEY);

const b64url = (input: string | Buffer) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

let cached: { token: string; exp: number } | null = null;

/** Returns an access token for the given scopes, cached until ~1 min before expiry. */
export async function getAccessToken(scopes: string[]): Promise<string | null> {
  if (!GOOGLE_SA_CONFIGURED) return null;
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.exp > now + 60) return cached.token;

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
    console.error("Service-account key is invalid or malformed:", err);
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
      console.error("Google token exchange failed:", res.status, await res.text());
      return null;
    }
    const d = await res.json();
    cached = { token: d.access_token, exp: now + (d.expires_in ?? 3600) };
    return cached.token;
  } catch (err) {
    console.error("Google token request error:", err);
    return null;
  }
}

export const SCOPES = {
  analytics: ["https://www.googleapis.com/auth/analytics.readonly"],
  searchConsole: ["https://www.googleapis.com/auth/webmasters.readonly"],
  indexing: ["https://www.googleapis.com/auth/indexing"],
};
