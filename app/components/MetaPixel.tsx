"use client";

import Script from "next/script";

// Real Pixel ID comes from NEXT_PUBLIC_META_PIXEL_ID (Meta Events Manager).
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// A Meta Pixel ID is numeric. The env var was set to the literal placeholder
// "PASTE_PIXEL_ID_HERE", so every page load fired a junk request at Facebook
// and no conversion was ever recorded. Render nothing unless the ID is real.
export const PIXEL_CONFIGURED = /^\d{10,20}$/.test(PIXEL_ID);

export default function MetaPixel() {
  if (!PIXEL_CONFIGURED) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Call this after a successful form submission
export function trackLead(data: { name: string; phone: string; course: string }) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (!fbq) return;
  fbq("track", "Lead", {
    content_name: data.course,
    content_category: "Beauty Course Enquiry",
    value: 20000,
    currency: "INR",
  });
}
