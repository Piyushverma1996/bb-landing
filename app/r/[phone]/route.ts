import { NextResponse } from "next/server";

// Meta rejects wa.me links in template buttons ("Direct links to WhatsApp
// aren't allowed"), so the bb_new_lead button points here instead and we
// forward to WhatsApp. Digits only - anything else 404s rather than becoming
// an open redirect.
export async function GET(_req: Request, { params }: { params: Promise<{ phone: string }> }) {
  const { phone } = await params;
  if (!/^\d{10,13}$/.test(phone)) return new NextResponse("Not found", { status: 404 });

  const text = encodeURIComponent(
    "Hi! This is Urvashi from Blushes & Brushes. Thank you for your enquiry - I'd love to help. Could you share your event date?"
  );
  return NextResponse.redirect(`https://wa.me/${phone}?text=${text}`, 302);
}
