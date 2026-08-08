"use client";

import Script from "next/script";

// Microsoft Clarity: heatmaps, scroll maps and session recordings.
// Chosen over Hotjar/VWO/Mixpanel deliberately - it is free with no session
// cap, which matters because paid tools bill per session and this site does
// ~30 sessions a week. It is also a Microsoft product, so usage is a mild
// positive signal for Bing, which is what feeds ChatGPT and Copilot.
const ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";
export const CLARITY_ON = /^[a-z0-9]{8,15}$/i.test(ID);

export default function Clarity() {
  if (!CLARITY_ON) return null;
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${ID}");`}
    </Script>
  );
}
