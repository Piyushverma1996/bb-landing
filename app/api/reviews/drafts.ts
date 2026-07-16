// Draft bank shared by the /api/reviews endpoint and the dashboard UI.
// SAME 20 Google + 15 Justdial drafts as Marketing/Review QR Kit/Reviews_Google_and_Justdial.txt.
// used-state is tracked client-side (localStorage) — one dashboard, one operator, this is enough.

export interface Draft {
  id: string;              // stable ID for used-state tracking
  platform: "Google" | "Justdial";
  tag: string;             // short label ("Bridal / airbrush", "Hinglish / nails")
  text: string;
  hindi?: boolean;
}

export const DRAFTS: Draft[] = [
  // ── GOOGLE ──
  { id: "G1", platform: "Google", tag: "Bridal · airbrush", text: "Got my bridal makeup done by Urvashi at Blushes & Brushes and it lasted from the morning pheras to the late-night reception — the airbrush base didn't budge in the Delhi heat. She understood what would suit my face instead of doing a template look. Best makeup artist I found in West Delhi." },
  { id: "G2", platform: "Google", tag: "Bridal · HD + trial", text: "Booked Urvashi for my wedding after a trial at her Ramesh Nagar studio and it was the best decision of my wedding planning. HD makeup looked flawless in photos and in person, she was calm and punctual, and she travelled to my venue in NCR without any fuss." },
  { id: "G3", platform: "Google", tag: "Engagement / Roka", text: "My engagement makeup by Blushes & Brushes got more compliments than my outfit! Soft, natural and photographed beautifully. Transparent pricing, no hidden charges. Highly recommend for Roka/Sagan looks in Delhi." },
  { id: "G4", platform: "Google", tag: "Party makeup", text: "Got party makeup done at Blushes & Brushes in Ramesh Nagar for my sister's sangeet — a glam look that survived five hours of dancing. Genuinely skilled artist and such a warm person." },
  { id: "G5", platform: "Google", tag: "Nails · ₹499 offer", text: "Got gel nail extensions under their ₹499 offer and honestly expected something basic — walked out with a gorgeous French set with free nail art. Clean tools, careful cuticle work, zero pain. Already booked my refill. Best nail studio in Ramesh Nagar." },
  { id: "G6", platform: "Google", tag: "Nails · durability", text: "Best nail extensions I've had in Delhi — four weeks and not one nail lifted. Hygienic studio and Urvashi explains aftercare properly instead of rushing you out." },
  { id: "G7", platform: "Google", tag: "Beauty · facial", text: "Took the Glow Cleanup + pedicure combo and my skin glowed for days. Spotless studio, premium products, and honest advice — she actually talked me OUT of a service I didn't need. Hidden gem opposite Subway in Ramesh Nagar." },
  { id: "G8", platform: "Google", tag: "Regular client", text: "Regular client now for nails and facials. Consistent quality every single visit, friendly staff, fair prices. If you're searching for a reliable beauty salon in West Delhi, this is it." },
  { id: "G9", platform: "Google", tag: "Mother of the bride", text: "Booked Blushes & Brushes for my daughter's wedding — Urvashi did the bride and also gave me an elegant, age-appropriate look without making me feel 'done up'. Professional team, on time, lovely experience for the whole family." },
  { id: "G10", platform: "Google", tag: "Hinglish · party", hindi: true, text: "Ramesh Nagar me best makeup artist! Sangeet ke liye makeup karwaya tha — pura function dance karne ke baad bhi makeup intact tha. Urvashi ma'am bahut sweet hain aur rates bhi reasonable. Highly recommended!" },
  { id: "G11", platform: "Google", tag: "Hinglish · nails", hindi: true, text: "Nail extensions ₹499 wale offer me karwaye — itni sundar French design free me mili, expect hi nahi kiya tha. Bilkul pain nahi hua aur tools ekdum saaf the. West Delhi me isse better nail studio nahi milega." },
  { id: "G12", platform: "Google", tag: "First-timer", text: "First time getting professional makeup done and I was nervous about looking 'cakey' — Urvashi kept it so natural that my family kept asking what was different. She listens instead of imposing. Found my permanent makeup artist in West Delhi." },
  { id: "G13", platform: "Google", tag: "Keratin + beauty", text: "Took a keratin spa and De-Tan before my cousin's wedding — visible difference in one sitting. The studio at Ramesh Nagar is small but spotless, and they never push extra services on you." },
  { id: "G14", platform: "Google", tag: "Destination bridal", text: "Urvashi travelled to my venue in Gurgaon for my wedding morning — arrived before time with her full kit, stayed calm through the chaos, and my airbrush makeup lasted 13 hours. Worth every rupee for a stress-free bridal morning." },
  { id: "G15", platform: "Google", tag: "Groom side", text: "Got my mother and sister ready here for my wedding — both looked stunning and the team even did a quick cleanup for me. Easy WhatsApp booking, fair package pricing for multiple people." },
  { id: "G16", platform: "Google", tag: "Festival look", text: "Karwa Chauth makeup + mehndi-side nails done at Blushes & Brushes — subtle, elegant and it photographed beautifully in the evening light. Booking on WhatsApp took two minutes." },
  { id: "G17", platform: "Google", tag: "Course student", text: "Joined Urvashi ma'am's nail extension course — she teaches hands-on with real practice, shares her actual product list, and answers every doubt patiently. Best investment for anyone starting a beauty career in Delhi." },
  { id: "G18", platform: "Google", tag: "Photo-first short", text: "Look at the photos — this is ALL her work. Bridal makeup that looks like your skin, only better. Blushes & Brushes, Ramesh Nagar. That's the review. (attach 2-3 photos)" },
  { id: "G19", platform: "Google", tag: "Comparison shopper", text: "Visited three studios in West Delhi before choosing Blushes & Brushes for my engagement — best consultation, clearest pricing, zero pressure. The look on the day proved I chose right." },
  { id: "G20", platform: "Google", tag: "Long-wear reception", text: "My reception makeup survived Delhi winter fog, 200 hugs and a crying session during vidaai — still looked fresh in the last photo at 1 AM. If long-lasting bridal makeup is your priority, this is your artist." },

  // ── JUSTDIAL ──
  { id: "J1", platform: "Justdial", tag: "Hygiene + staff", text: "Very hygienic studio — tools sanitised in front of me and the station cleaned before my session. Staff is friendly and cooperative. Felt completely comfortable throughout." },
  { id: "J2", platform: "Justdial", tag: "Professionalism", text: "Extremely professional team. My function was running late and Urvashi stayed calm, adjusted the schedule and still delivered a perfect look under pressure. Highly recommended." },
  { id: "J3", platform: "Justdial", tag: "Value for money", text: "Excellent value for money. Nail extensions with complimentary art at this price is unmatched in Ramesh Nagar. Quality of products is premium, no shortcuts." },
  { id: "J4", platform: "Justdial", tag: "Bridal experience", text: "Got my bridal makeup here. Punctual, professional and the look lasted the whole event. The team made me feel relaxed on a very stressful day. Five stars well earned." },
  { id: "J5", platform: "Justdial", tag: "Staff · comfort", text: "Warm and welcoming staff, very supportive and caring. They listen to what you want instead of pushing services. My go-to salon in Ramesh Nagar now." },
  { id: "J6", platform: "Justdial", tag: "Cleanliness + skill", text: "Neat, clean and well-maintained studio. Urvashi is highly skilled at both makeup and nails, and the staff environment is very friendly and cooperative. Will keep coming back." },
  { id: "J7", platform: "Justdial", tag: "Overall experience", text: "Wonderful overall experience — easy booking on WhatsApp, on-time service, professional behaviour and beautiful results. One of the best beauty parlours in West Delhi." },
  { id: "J8", platform: "Justdial", tag: "Hinglish · staff", hindi: true, text: "Bahut acchi service hai. Staff bohot friendly aur cooperative hai, koi extra service push nahi karte. Ramesh Nagar me trusted parlour hai ye." },
  { id: "J9", platform: "Justdial", tag: "Hinglish · hygiene", hindi: true, text: "Salon ekdum clean hai — mere saamne tools sanitize kiye. Nail extension karwaye the, ek month ho gaya, ek bhi nail nahi utra. Paise vasool." },
  { id: "J10", platform: "Justdial", tag: "Punctuality", text: "Booked for a family function — team was ready exactly on time and finished three people well before we had to leave. Professional and organised, which is rare." },
  { id: "J11", platform: "Justdial", tag: "Value + quality", text: "Prices are reasonable for the quality — branded products used in front of you, not refilled bottles. Good value for money for makeup and nails both." },
  { id: "J12", platform: "Justdial", tag: "Consultation quality", text: "They actually examine your skin and suggest what suits you — even advised me against a treatment I asked for because my skin didn't need it. Honest professionals." },
  { id: "J13", platform: "Justdial", tag: "Repeat visitor", text: "Third visit this year — same consistent quality every time. Friendly staff, hygienic setup, and results that last. My regular salon now." },
  { id: "J14", platform: "Justdial", tag: "Family booking", text: "Got makeup done for myself, my mother and my sister for a wedding. All three looks were different and suited each of us. Cooperative staff, smooth experience, fair package price." },
  { id: "J15", platform: "Justdial", tag: "Short & plain", text: "Clean salon, polite staff, professional work and honest pricing. Fully satisfied with the nail extensions. Recommended." },
];
