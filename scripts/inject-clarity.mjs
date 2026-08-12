// The homepage is a static file served by a rewrite, so it sits outside the
// React tree and cannot read process.env at runtime. This substitutes the
// Clarity id at build time from the same variable the React side uses, so both
// halves of the site report into one project and there is one value to manage.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "public/premium.html";
const ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
let html = readFileSync(FILE, "utf8");

// Meta Pixel: same reasoning as Clarity. The static homepage cannot read env at
// runtime, and it is the most-visited page, so it needs the id stamped in.
if (/^\d{10,20}$/.test(PIXEL)) {
  const next = html.replace(/var PIXEL_ID = "[^"]*";/, `var PIXEL_ID = "${PIXEL}";`);
  if (next !== html) {
    html = next;
    writeFileSync(FILE, html, "utf8");
    console.log(`[pixel] injected ${PIXEL} into ${FILE}`);
  } else {
    console.log("[pixel] id already current");
  }
} else {
  console.log("[pixel] NEXT_PUBLIC_META_PIXEL_ID not set or not numeric - homepage tag stays inert");
}

if (!/^[a-z0-9]{8,15}$/i.test(ID)) {
  console.log("[clarity] NEXT_PUBLIC_CLARITY_ID not set - homepage tag stays inert");
} else if (html.includes(`"${ID}"`)) {
  console.log("[clarity] id already injected");
} else {
  // Replace the placeholder, or a previously injected id, with the current one.
  const out = html.replace(/var CLARITY_ID = "[^"]*";/, `var CLARITY_ID = "${ID}";`);
  writeFileSync(FILE, out, "utf8");
  console.log(`[clarity] injected ${ID} into ${FILE}`);
}
