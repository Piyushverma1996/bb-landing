import { NextResponse } from "next/server";

// Meta rejects wa.me links in template buttons ("Direct links to WhatsApp
// aren't allowed"), so the bb_new_lead button points here instead and we
// forward to WhatsApp. Digits only - anything else 404s rather than becoming
// an open redirect.
export async function GET(_req: Request, { params }: { params: Promise<{ phone: string }> }) {
  const { phone } = await params;

  // A template button URL can arrive with an unsubstituted placeholder glued on
  // (".../r/%7B%7B1%7D%7D919899077017"). Strip whole {{n}} tokens FIRST - the
  // digit inside them would otherwise survive as a leading 1 and silently send
  // Urvashi to the wrong number.
  let raw = phone;
  try { raw = decodeURIComponent(phone); } catch { /* keep as-is if malformed */ }
  const digits = raw.replace(/\{\{\d+\}\}/g, "").replace(/\D/g, "");

  if (!/^\d{10,13}$/.test(digits)) return new NextResponse("Not found", { status: 404 });

  const text = encodeURIComponent(
    "Hi! This is Urvashi from Blushes & Brushes. Thank you for your enquiry - I'd love to help. Could you share your event date?"
  );
  return NextResponse.redirect(`https://wa.me/${digits}?text=${text}`, 302);
}
