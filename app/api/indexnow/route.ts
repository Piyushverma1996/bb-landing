import { NextResponse } from "next/server";

// IndexNow: instant URL submission to Bing, Yandex, Naver and Seznam.
// Google does not participate - but Bing is what powers ChatGPT and Copilot,
// so this is the fastest route to AI-search visibility. Unlike Google's
// Indexing API, submitting ordinary pages here is the protocol's intended use.
const KEY = "9099c2b77efb0f640613eb0e00658e06";
const HOST = "blushesnbrushes.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function sitemapUrls(): Promise<string[]> {
  const r = await fetch(`https://${HOST}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
  const xml = await r.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

export async function GET() {
  return NextResponse.json({
    configured: true,
    keyLocation: KEY_LOCATION,
    hint: "POST here to submit every sitemap URL, or POST {urls:[...]} for specific pages.",
  });
}

export async function POST(req: Request) {
  let urls: string[] = [];
  try {
    urls = (await req.json())?.urls ?? [];
  } catch {
    /* no body - submit the whole sitemap */
  }
  if (!urls.length) urls = await sitemapUrls();

  // Only ever submit our own URLs: IndexNow rejects a mismatched host, and this
  // keeps the open endpoint from being used to submit somebody else's site.
  urls = urls.filter((u) => u.startsWith(`https://${HOST}`)).slice(0, 10000);
  if (!urls.length) return NextResponse.json({ error: "No valid URLs" }, { status: 422 });

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
    signal: AbortSignal.timeout(20000),
  });

  // 200 = accepted, 202 = accepted while the key file is still being verified.
  const detail = (await res.text()).slice(0, 300);
  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urls.length, detail });
}
