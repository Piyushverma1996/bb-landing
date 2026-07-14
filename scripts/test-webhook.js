#!/usr/bin/env node
/**
 * Webhook end-to-end test
 * Usage:
 *   node scripts/test-webhook.js              → hits localhost:3000
 *   node scripts/test-webhook.js live         → hits the Vercel URL
 *   node scripts/test-webhook.js <custom-url> → hits any URL
 */

const BASE_URLS = {
  local: "http://localhost:3000",
  live:  "https://bb-landing-six.vercel.app",
};

const target = process.argv[2];
const base = BASE_URLS[target] ?? target ?? BASE_URLS.local;
const url  = `${base}/api/lead`;

const testCases = [
  {
    label: "✅ Valid lead",
    body: { name: "Priya Sharma", phone: "9876543210", course: "Makeup Course" },
    expectStatus: 200,
  },
  {
    label: "❌ Missing name",
    body: { name: "", phone: "9876543210", course: "Makeup Course" },
    expectStatus: 422,
  },
  {
    label: "❌ Short phone number",
    body: { name: "Priya Sharma", phone: "98765", course: "Makeup Course" },
    expectStatus: 422,
  },
  {
    label: "❌ No course selected",
    body: { name: "Priya Sharma", phone: "9876543210", course: "" },
    expectStatus: 422,
  },
];

async function run() {
  console.log(`\nTesting: ${url}\n${"─".repeat(50)}`);

  let passed = 0;
  for (const tc of testCases) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tc.body),
    }).catch(e => { console.error(`  NETWORK ERROR: ${e.message}`); return null; });

    if (!res) continue;

    const data = await res.json().catch(() => ({}));
    const ok   = res.status === tc.expectStatus;
    console.log(`${ok ? "PASS" : "FAIL"}  [${res.status}]  ${tc.label}`);
    if (!ok) console.log(`       Expected ${tc.expectStatus}, body:`, data);
    if (ok) passed++;
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`Results: ${passed}/${testCases.length} passed`);

  if (passed < testCases.length) {
    console.log("\n⚠  Some tests failed. Common causes:");
    console.log("   • Dev server not running (run: npm run dev)");
    console.log("   • WEBHOOK_URL env var pointing to a URL that is down");
    console.log("   • Form validation logic mismatch\n");
    process.exit(1);
  } else {
    console.log("\n🎉 All tests passed. The API route is working correctly.\n");
  }
}

run();
