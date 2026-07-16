// Draft bank shared by /api/reviews and the dashboard Reviews tab.
// Each draft is `owner`-tagged so the UI shows only the drafts that match
// which staff member served that client (Urvashi = makeup/bridal/courses;
// Kukkie = nails; Asha = beauty/skin). Client edits before posting.

export type Owner = "Urvashi" | "Kukkie" | "Asha";
export type Platform = "Google" | "Justdial";

export interface Draft {
  id: string;
  platform: Platform;
  owner: Owner;
  tag: string;
  text: string;
  hindi?: boolean;
}

export const DRAFTS: Draft[] = [
  // ══════════════ URVASHI · GOOGLE (bridal / makeup / courses) ══════════════
  { id: "U-G1",  platform: "Google", owner: "Urvashi", tag: "Bridal · airbrush",         text: "Got my bridal makeup done by Urvashi at Blushes & Brushes and it lasted from the morning pheras to the late-night reception — the airbrush base didn't budge in the Delhi heat. She understood what would suit my face instead of doing a template look. Best makeup artist I found in West Delhi." },
  { id: "U-G2",  platform: "Google", owner: "Urvashi", tag: "Bridal · HD + trial",       text: "Booked Urvashi for my wedding after a trial at her Ramesh Nagar studio and it was the best decision of my wedding planning. HD makeup looked flawless in photos and in person, she was calm and punctual, and she travelled to my venue in NCR without any fuss." },
  { id: "U-G3",  platform: "Google", owner: "Urvashi", tag: "Engagement / Roka",         text: "My engagement makeup by Blushes & Brushes got more compliments than my outfit! Soft, natural and photographed beautifully. Transparent pricing, no hidden charges. Highly recommend for Roka/Sagan looks in Delhi." },
  { id: "U-G4",  platform: "Google", owner: "Urvashi", tag: "Party makeup · sangeet",    text: "Got party makeup done at Blushes & Brushes in Ramesh Nagar for my sister's sangeet — a glam look that survived five hours of dancing. Genuinely skilled artist and such a warm person." },
  { id: "U-G5",  platform: "Google", owner: "Urvashi", tag: "Mother of the bride",       text: "Booked Blushes & Brushes for my daughter's wedding — Urvashi did the bride and also gave me an elegant, age-appropriate look without making me feel 'done up'. Professional team, on time, lovely experience for the whole family." },
  { id: "U-G6",  platform: "Google", owner: "Urvashi", tag: "Hinglish · sangeet",        hindi: true, text: "Ramesh Nagar me best makeup artist! Sangeet ke liye makeup karwaya tha — pura function dance karne ke baad bhi makeup intact tha. Urvashi ma'am bahut sweet hain aur rates bhi reasonable. Highly recommended!" },
  { id: "U-G7",  platform: "Google", owner: "Urvashi", tag: "First-timer / natural",     text: "First time getting professional makeup done and I was nervous about looking 'cakey' — Urvashi kept it so natural that my family kept asking what was different. She listens instead of imposing. Found my permanent makeup artist in West Delhi." },
  { id: "U-G8",  platform: "Google", owner: "Urvashi", tag: "Destination bridal",        text: "Urvashi travelled to my venue in Gurgaon for my wedding morning — arrived before time with her full kit, stayed calm through the chaos, and my airbrush makeup lasted 13 hours. Worth every rupee for a stress-free bridal morning." },
  { id: "U-G9",  platform: "Google", owner: "Urvashi", tag: "Family package",            text: "Got my mother and sister ready here for my wedding — both looked stunning and the team even did a quick cleanup for me. Easy WhatsApp booking, fair package pricing for multiple people." },
  { id: "U-G10", platform: "Google", owner: "Urvashi", tag: "Karwa Chauth",              text: "Karwa Chauth makeup done at Blushes & Brushes — subtle, elegant and it photographed beautifully in the evening light. Booking on WhatsApp took two minutes." },
  { id: "U-G11", platform: "Google", owner: "Urvashi", tag: "Course student",            text: "Joined Urvashi ma'am's nail extension course — she teaches hands-on with real practice, shares her actual product list, and answers every doubt patiently. Best investment for anyone starting a beauty career in Delhi." },
  { id: "U-G12", platform: "Google", owner: "Urvashi", tag: "Photo-first bridal",        text: "Look at the photos — this is ALL her work. Bridal makeup that looks like your skin, only better. Blushes & Brushes, Ramesh Nagar. That's the review. (attach 2-3 photos)" },
  { id: "U-G13", platform: "Google", owner: "Urvashi", tag: "Comparison shopper",        text: "Visited three studios in West Delhi before choosing Blushes & Brushes for my engagement — best consultation, clearest pricing, zero pressure. The look on the day proved I chose right." },
  { id: "U-G14", platform: "Google", owner: "Urvashi", tag: "Reception · long-wear",     text: "My reception makeup survived Delhi winter fog, 200 hugs and a crying session during vidaai — still looked fresh in the last photo at 1 AM. If long-lasting bridal makeup is your priority, this is your artist." },
  { id: "U-G15", platform: "Google", owner: "Urvashi", tag: "Sagan · airbrush trial",    text: "Did my Sagan makeup at Blushes & Brushes as a 'trial before the wedding'. Loved it so much I booked the whole wedding series with Urvashi. Skilled, professional, and honest about what suits my skin tone." },

  // ══════════════ URVASHI · JUSTDIAL ══════════════
  { id: "U-J1",  platform: "Justdial", owner: "Urvashi", tag: "Professionalism",         text: "Extremely professional team. My function was running late and Urvashi stayed calm, adjusted the schedule and still delivered a perfect look under pressure. Highly recommended." },
  { id: "U-J2",  platform: "Justdial", owner: "Urvashi", tag: "Bridal experience",       text: "Got my bridal makeup here. Punctual, professional and the look lasted the whole event. The team made me feel relaxed on a very stressful day. Five stars well earned." },
  { id: "U-J3",  platform: "Justdial", owner: "Urvashi", tag: "Overall experience",      text: "Wonderful overall experience — easy booking on WhatsApp, on-time service, professional behaviour and beautiful results. One of the best beauty parlours in West Delhi." },
  { id: "U-J4",  platform: "Justdial", owner: "Urvashi", tag: "Punctuality · family",    text: "Booked for a family function — team was ready exactly on time and finished three people well before we had to leave. Professional and organised, which is rare." },
  { id: "U-J5",  platform: "Justdial", owner: "Urvashi", tag: "Value + quality",         text: "Prices are reasonable for the quality — branded products used in front of you, not refilled bottles. Good value for money for makeup and nails both." },
  { id: "U-J6",  platform: "Justdial", owner: "Urvashi", tag: "Family bridal",           text: "Got makeup done for myself, my mother and my sister for a wedding. All three looks were different and suited each of us. Cooperative staff, smooth experience, fair package price." },
  { id: "U-J7",  platform: "Justdial", owner: "Urvashi", tag: "Cleanliness + skill",     text: "Neat, clean and well-maintained studio. Urvashi is highly skilled at both makeup and nails, and the staff environment is very friendly and cooperative. Will keep coming back." },

  // ══════════════ KUKKIE · GOOGLE (nail specialist) ══════════════
  { id: "K-G1",  platform: "Google", owner: "Kukkie", tag: "Nails · ₹499 offer",         text: "Got gel nail extensions under their ₹499 offer and honestly expected something basic — walked out with a gorgeous French set with free nail art. Clean tools, careful cuticle work, zero pain. Already booked my refill. Best nail studio in Ramesh Nagar." },
  { id: "K-G2",  platform: "Google", owner: "Kukkie", tag: "Durability · 4 weeks",       text: "Best nail extensions I've had in Delhi — four weeks and not one nail lifted. Hygienic studio, careful application, and they explain aftercare properly instead of rushing you out." },
  { id: "K-G3",  platform: "Google", owner: "Kukkie", tag: "Hinglish · nails",           hindi: true, text: "Nail extensions ₹499 wale offer me karwaye — itni sundar French design free me mili, expect hi nahi kiya tha. Bilkul pain nahi hua aur tools ekdum saaf the. West Delhi me isse better nail studio nahi milega." },
  { id: "K-G4",  platform: "Google", owner: "Kukkie", tag: "Chrome nails",               text: "Got chrome nails for my cousin's cocktail — the mirror finish came out exactly like the reference photo I brought. Careful application, no chips after three weeks. Blushes & Brushes has become my go-to for anything nails." },
  { id: "K-G5",  platform: "Google", owner: "Kukkie", tag: "Ombré · designer set",       text: "Designer ombré gel set for my sister's wedding — the colour blend was flawless and matched my lehenga perfectly. Photographed beautifully in every event photo. Reasonable pricing for the quality." },
  { id: "K-G6",  platform: "Google", owner: "Kukkie", tag: "Refill client",              text: "Regular refill client at Blushes & Brushes — same quality every three weeks. Prompt appointments on WhatsApp, honest advice on when to switch shapes or take a break. Trustworthy nail studio." },
  { id: "K-G7",  platform: "Google", owner: "Kukkie", tag: "Nail art · variety",         text: "Tried five different nail art styles here over the year — French, chrome, ombré, matte finish and a designer set for Diwali. Consistent quality every single visit. Highly recommend for anyone in West Delhi." },

  // ══════════════ KUKKIE · JUSTDIAL ══════════════
  { id: "K-J1",  platform: "Justdial", owner: "Kukkie", tag: "Value · nails",            text: "Excellent value for money. Nail extensions with complimentary art at this price is unmatched in Ramesh Nagar. Quality of products is premium, no shortcuts." },
  { id: "K-J2",  platform: "Justdial", owner: "Kukkie", tag: "Hinglish · durability",    hindi: true, text: "Nail extension karwaye the, ek month ho gaya, ek bhi nail nahi utra. Salon ekdum clean hai — mere saamne tools sanitize kiye. Paise vasool." },
  { id: "K-J3",  platform: "Justdial", owner: "Kukkie", tag: "Short & plain",            text: "Clean salon, polite staff, professional work and honest pricing. Fully satisfied with the nail extensions. Recommended." },
  { id: "K-J4",  platform: "Justdial", owner: "Kukkie", tag: "Nail hygiene",             text: "Every tool was sanitised in front of me and cuticle work was gentle — no cuts, no pain. Nail extensions have lasted three weeks with zero lifting. Trustworthy nail salon in Ramesh Nagar." },
  { id: "K-J5",  platform: "Justdial", owner: "Kukkie", tag: "Design variety",           text: "So many nail art options — from simple French to detailed designer sets. Whatever reference photo I bring, they replicate exactly. Best nail studio experience in West Delhi." },

  // ══════════════ ASHA · GOOGLE (beauty / skin) ══════════════
  { id: "A-G1",  platform: "Google", owner: "Asha", tag: "Facial + pedicure combo",      text: "Took the Glow Cleanup + pedicure combo and my skin glowed for days. Spotless studio, premium products, and honest advice — they actually talked me OUT of a service I didn't need. Hidden gem opposite Subway in Ramesh Nagar." },
  { id: "A-G2",  platform: "Google", owner: "Asha", tag: "Regular client",               text: "Regular client now for facials and beauty rituals. Consistent quality every single visit, friendly staff, fair prices. If you're searching for a reliable beauty salon in West Delhi, this is it." },
  { id: "A-G3",  platform: "Google", owner: "Asha", tag: "Keratin + De-Tan",             text: "Took a keratin spa and De-Tan before my cousin's wedding — visible difference in one sitting. The studio at Ramesh Nagar is small but spotless, and they never push extra services on you." },
  { id: "A-G4",  platform: "Google", owner: "Asha", tag: "Full pamper day",              text: "Booked the Full Pamper Day at Blushes & Brushes — facial, pedicure and threading in a relaxed 2-hour block. Excellent value for money and the staff genuinely takes care of you." },
  { id: "A-G5",  platform: "Google", owner: "Asha", tag: "Pre-wedding skin prep",        text: "Started my pre-wedding skin routine at Blushes & Brushes three months before the wedding. Genuine, honest advice from Asha — not a single up-sell. My skin looked incredible in every bridal photo." },
  { id: "A-G6",  platform: "Google", owner: "Asha", tag: "Threading + cleanup",          text: "Quick threading + Glow Cleanup on a busy afternoon — in and out in 40 minutes, spotless finish, gentle hands. My go-to beauty salon in Ramesh Nagar for anything last-minute." },

  // ══════════════ ASHA · JUSTDIAL ══════════════
  { id: "A-J1",  platform: "Justdial", owner: "Asha", tag: "Hygiene + staff",            text: "Very hygienic studio — tools sanitised in front of me and the station cleaned before my session. Staff is friendly and cooperative. Felt completely comfortable throughout." },
  { id: "A-J2",  platform: "Justdial", owner: "Asha", tag: "Staff · comfort",            text: "Warm and welcoming staff, very supportive and caring. They listen to what you want instead of pushing services. My go-to salon in Ramesh Nagar now." },
  { id: "A-J3",  platform: "Justdial", owner: "Asha", tag: "Hinglish · staff",           hindi: true, text: "Bahut acchi service hai. Staff bohot friendly aur cooperative hai, koi extra service push nahi karte. Ramesh Nagar me trusted parlour hai ye." },
  { id: "A-J4",  platform: "Justdial", owner: "Asha", tag: "Honest consultation",        text: "They actually examine your skin and suggest what suits you — even advised me against a treatment I asked for because my skin didn't need it. Honest professionals." },
  { id: "A-J5",  platform: "Justdial", owner: "Asha", tag: "Repeat visitor",             text: "Third visit this year — same consistent quality every time. Friendly staff, hygienic setup, and results that last. My regular salon now." },
  { id: "A-J6",  platform: "Justdial", owner: "Asha", tag: "De-Tan · glow",              text: "De-Tan ritual gave visible glow in one sitting before a family function. Reasonable pricing, clean setup, and no upselling. Highly satisfied — will visit again." },
];
