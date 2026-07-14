const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, ExternalHyperlink,
  PageBreak
} = require("docx");
const fs = require("fs");
const path = require("path");

// ─── colours ────────────────────────────────────────────────────
const TEAL   = "1E4A3A";
const GOLD   = "C9A066";
const CREAM  = "F5EDD8";
const WHITE  = "FFFFFF";
const LIGHT  = "EDE0C4";
const GRAY   = "F2F2F2";

// ─── helpers ────────────────────────────────────────────────────
const border = (color = "CCCCCC") => ({ style: BorderStyle.SINGLE, size: 1, color });
const cellBorders = (c = "CCCCCC") => ({ top: border(c), bottom: border(c), left: border(c), right: border(c) });
const noBorder  = () => ({ style: BorderStyle.NONE, size: 0, color: WHITE });
const noBorders = () => ({ top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() });

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 36, color: WHITE, font: "Arial" })],
    shading: { fill: TEAL, type: ShadingType.CLEAR },
    indent: { left: 200, right: 200 },
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } },
    children: [new TextRun({ text, bold: true, size: 28, color: TEAL, font: "Arial" })],
  });
}

function h3(text, color = TEAL) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 24, color, font: "Arial" })],
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial", color: "333333", ...opts })],
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, font: "Arial", color: "333333", ...opts })],
  });
}

function note(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 400 },
    shading: { fill: GRAY, type: ShadingType.CLEAR },
    children: [new TextRun({ text: "💡 " + text, size: 20, italics: true, font: "Arial", color: "555555" })],
  });
}

function spacer(n = 1) {
  return Array.from({ length: n }, () => new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun("")] }));
}

function labelValue(label, value) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text: label + ": ", bold: true, size: 22, font: "Arial", color: TEAL }),
      new TextRun({ text: value, size: 22, font: "Arial", color: "333333" }),
    ],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ─── simple 2-col table ─────────────────────────────────────────
function twoColTable(rows, w1 = 3000, w2 = 6360) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [w1, w2],
    rows: rows.map(([a, b]) => new TableRow({
      children: [
        new TableCell({
          width: { size: w1, type: WidthType.DXA },
          borders: cellBorders("CCCCCC"),
          shading: { fill: LIGHT, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: a, bold: true, size: 20, font: "Arial", color: TEAL })] })],
        }),
        new TableCell({
          width: { size: w2, type: WidthType.DXA },
          borders: cellBorders("CCCCCC"),
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: b, size: 20, font: "Arial", color: "333333" })] })],
        }),
      ],
    })),
  });
}

// ─── header row helper ──────────────────────────────────────────
function headerRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((l, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: cellBorders(TEAL),
      shading: { fill: TEAL, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: l, bold: true, size: 20, color: WHITE, font: "Arial" })] })],
    })),
  });
}

function dataRow(cells, widths, shade = false) {
  return new TableRow({
    children: cells.map((c, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: cellBorders("CCCCCC"),
      shading: { fill: shade ? "F9F4EC" : WHITE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: c, size: 20, font: "Arial", color: "333333" })] })],
    })),
  });
}

// ─── script card ────────────────────────────────────────────────
function scriptCard(label, duration, platform, lines) {
  const rows = [];
  rows.push(new TableRow({
    children: [new TableCell({
      columnSpan: 2,
      borders: { top: border(GOLD), bottom: border(GOLD), left: border(GOLD), right: border(GOLD) },
      shading: { fill: TEAL, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 200, right: 200 },
      children: [new Paragraph({
        children: [
          new TextRun({ text: label + " ", bold: true, size: 24, color: GOLD, font: "Arial" }),
          new TextRun({ text: " | " + duration + " | " + platform, size: 20, color: "CCCCCC", font: "Arial" }),
        ],
      })],
    })],
  }));

  lines.forEach(([ts, script], idx) => {
    rows.push(new TableRow({
      children: [
        new TableCell({
          width: { size: 1440, type: WidthType.DXA },
          borders: cellBorders("CCCCCC"),
          shading: { fill: LIGHT, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.TOP,
          children: [new Paragraph({ children: [new TextRun({ text: ts, bold: true, size: 20, color: TEAL, font: "Arial" })] })],
        }),
        new TableCell({
          width: { size: 7920, type: WidthType.DXA },
          borders: cellBorders("CCCCCC"),
          shading: { fill: idx % 2 === 0 ? WHITE : "FAFAF8", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 160, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: script, size: 20, font: "Arial", color: "333333" })] })],
        }),
      ],
    }));
  });

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1440, 7920],
    rows,
  });
}

// ════════════════════════════════════════════════════════════════
// DOCUMENT
// ════════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: WHITE },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: TEAL },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } },
          children: [new TextRun({ text: "Blushes & Brushes  |  Ad Content Brief  |  Summer 2026", size: 18, color: "888888", font: "Arial" })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: GOLD, space: 4 } },
          children: [
            new TextRun({ text: "CONFIDENTIAL  |  Blushes & Brushes by Urvashi Trehan  |  76784 46364  |  Page ", size: 18, color: "888888", font: "Arial" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888", font: "Arial" }),
          ],
        })],
      }),
    },
    children: [

      // ── COVER ──────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 120 },
        shading: { fill: TEAL, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "B & B", size: 72, bold: true, color: GOLD, font: "Arial" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        shading: { fill: TEAL, type: ShadingType.CLEAR },
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "BLUSHES & BRUSHES", size: 28, bold: true, color: WHITE, font: "Arial", characterSpacing: 200 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        shading: { fill: TEAL, type: ShadingType.CLEAR },
        spacing: { before: 60, after: 600 },
        children: [new TextRun({ text: "by Urvashi Trehan", size: 22, italics: true, color: GOLD, font: "Arial" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 160 },
        children: [new TextRun({ text: "AD CONTENT BRIEF", size: 52, bold: true, color: TEAL, font: "Arial", characterSpacing: 120 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "Summer 2026  |  Meta & Instagram Lead Campaign", size: 26, color: "666666", font: "Arial" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 1200 },
        children: [new TextRun({ text: "Everything you need to film, caption & post", size: 22, italics: true, color: "999999", font: "Arial" })],
      }),

      // quick-ref box
      new Table({
        width: { size: 6000, type: WidthType.DXA },
        columnWidths: [2000, 4000],
        rows: [
          new TableRow({ children: [
            new TableCell({ columnSpan: 2, borders: cellBorders(GOLD), shading: { fill: GOLD, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "QUICK REFERENCE", bold: true, size: 22, color: WHITE, font: "Arial" })] })] }),
          ]}),
          ...[
            ["Academy", "Blushes & Brushes, Ramesh Nagar, New Delhi"],
            ["Founder", "Urvashi Trehan"],
            ["Phone / WhatsApp", "76784 46364"],
            ["Batch size", "Max 5 students"],
            ["Courses", "Makeup · Nails · Beauty Master"],
            ["Fee per course", "₹20,000"],
            ["Campaign goal", "Free 1-Day Trial Class bookings"],
            ["Summer target", "May – August 2026"],
          ].map(([a, b], i) => dataRow([a, b], [2000, 4000], i % 2 === 0)),
        ],
      }),

      pageBreak(),

      // ── HOW TO USE THIS DOCUMENT ────────────────────────────
      h1("  HOW TO USE THIS DOCUMENT"),
      ...spacer(1),
      body("This brief is written for you, Urvashi. It tells you exactly what to film, what to say, and what to write in captions. You do not need a videographer or studio — your phone and good natural light are enough."),
      ...spacer(1),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1000, 2000, 6360],
        rows: [
          headerRow(["Step", "What", "How"], [1000, 2000, 6360]),
          dataRow(["1", "Read all scripts", "Familiarise yourself before filming so delivery feels natural"], [1000, 2000, 6360], false),
          dataRow(["2", "Film the shot list", "One 2-hour session covers everything. See Part 2."], [1000, 2000, 6360], true),
          dataRow(["3", "Edit on CapCut", "Free app. Add subtitles auto, trim clips, add background music."], [1000, 2000, 6360], false),
          dataRow(["4", "Post to Instagram", "3x/week using the schedule in Part 4."], [1000, 2000, 6360], true),
          dataRow(["5", "Boost top posts", "Rs 200-300/day on your best-performing Reel."], [1000, 2000, 6360], false),
          dataRow(["6", "Run paid ads", "Use scripts in Part 1 for proper Meta ad campaigns."], [1000, 2000, 6360], true),
        ],
      }),

      pageBreak(),

      // ── PART 1: VIDEO AD SCRIPTS ────────────────────────────
      h1("  PART 1 — VIDEO AD SCRIPTS"),
      ...spacer(1),
      body("You have 5 different \"angles\" below — each targets a different type of person. Film them all if you can. If you only have time for two, do Angle A (students) and Angle B (second income) first."),
      ...spacer(1),

      // Angle overview table
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 2400, 2760, 3600],
        rows: [
          headerRow(["#", "Angle", "Who It Targets", "Best Format"], [600, 2400, 2760, 3600]),
          dataRow(["A", "Don’t Waste Your Summer", "Students 18–22, on summer break", "15-sec Reel + Story"], [600, 2400, 2760, 3600], false),
          dataRow(["B", "Passion into Paycheque", "Homemakers 25–40, want 2nd income", "30-sec Feed Ad"], [600, 2400, 2760, 3600], true),
          dataRow(["C", "Career Switch", "Working women 23–35", "15-sec Reel"], [600, 2400, 2760, 3600], false),
          dataRow(["D", "Only 2 Seats Left", "All audiences, urgency-driven", "10-sec Story"], [600, 2400, 2760, 3600], true),
          dataRow(["E", "Founder Story", "People who visited the page before", "45-sec Feed Video"], [600, 2400, 2760, 3600], false),
        ],
      }),
      ...spacer(2),

      // ANGLE A
      h2("Angle A — “Don’t Waste Your Summer”"),
      labelValue("Target", "Women 18–22, college students on summer break"),
      labelValue("Platform", "Instagram Reels + Stories"),
      labelValue("Format", "15 seconds, vertical 9:16"),
      ...spacer(1),
      scriptCard("ANGLE A", "15 seconds", "Reels + Stories", [
        ["0–3s\nHOOK", "Look directly at the camera. Say out loud:\n“Tumhara summer break shuru ho gaya. Teen mahine. Kya plan hai?”\n(Your summer break has started. 3 months. What’s the plan?)\nText overlay: “3 MONTHS. WHAT’S YOUR PLAN?”"],
        ["3–8s\nSHOW", "Cut to B-roll: salon interior, student at mirror, nail art close-up.\nVoiceover: “Ek academy hai Delhi mein — sirf 5 students ek batch. Real salon. Real skills.”"],
        ["8–13s\nOFFER", "Back to your face.\n“Ek free trial class ke liye aao — dekho, seekho, khud decide karo.”\n(Come for a free trial class — see it, learn, decide yourself.)"],
        ["13–15s\nCTA", "Hold up your phone showing the number.\n“WhatsApp karo: 76784 46364”\nText on screen: “FREE TRIAL → 76784 46364”"],
      ]),
      ...spacer(1),
      h3("Caption for Angle A"),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        shading: { fill: GRAY, type: ShadingType.CLEAR },
        indent: { left: 240 },
        children: [new TextRun({ text: "3 mahine ki chhutti hai. Is summer ek aisi skill seekho jo hamesha kaam aaye ❤️\n\nBlushes & Brushes, Ramesh Nagar:\n✅ Sirf 5 students per batch — poora attention\n✅ Real salon environment, real clients\n✅ Certificate + Placement Support\n✅ Urvashi Trehan ke saath direct mentorship\n\nFREE 1-day trial class → call/WhatsApp 76784 46364\n\n#makeupcoursedelhi #beautycourse #summerskills #makeupacademy #delhimakeup #nailcourse #blushesandbrushesByUrvashiTrehan", size: 20, font: "Arial", color: "333333" })],
      }),
      ...spacer(2),

      // ANGLE B
      h2("Angle B — “Passion into Paycheque”"),
      labelValue("Target", "Homemakers & women 25–40, want a second income"),
      labelValue("Platform", "Facebook Feed + Instagram Feed"),
      labelValue("Format", "30 seconds, talking-head + B-roll"),
      ...spacer(1),
      scriptCard("ANGLE B", "30 seconds", "Facebook + Instagram Feed", [
        ["0–4s\nHOOK", "Straight to camera, confident tone.\n“Agar aapko makeup mein interest hai — yeh video zaroor dekhein.”\n(If you have an interest in makeup — you must watch this video.)"],
        ["4–10s\nPAIN", "Voiceover on B-roll of brushes, products.\n“Bohot saari women hain jo makeup ka passion rakhti hain — lekin proper training nahi mili. Toh woh skill kabhi income nahi bana paaya.”"],
        ["10–18s\nSOLUTION", "Show yourself teaching a student 1-on-1.\n“Blushes & Brushes mein main personally har student ko sikhati hoon. Max 5 log ek batch. Real salon. Real clients. Ek haath se kaam karo, dusre se seekho.”"],
        ["18–24s\nPROOF", "Show certificate, student smiling.\n“500 se zyada students trained. Certificate. Placement support. Aur ek skill jo ₹30,000–50,000 per month dila sakti hai.”"],
        ["24–30s\nCTA", "Back to camera, warm smile.\n“Abhi pehla step lena bahut easy hai — free trial class. Bilkul free. Aao, dekho, decide karo.”\nText: “WhatsApp 76784 46364”"],
      ]),
      ...spacer(1),
      h3("Caption for Angle B"),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        shading: { fill: GRAY, type: ShadingType.CLEAR },
        indent: { left: 240 },
        children: [new TextRun({ text: "Passion ko paycheque mein badlo 💰\n\nGhar baithe ₹30,000–50,000/month earn karna possible hai — agar aapke paas right skill ho.\n\nBlushes & Brushes, Ramesh Nagar:\n✅ Max 5 students per batch (aapko poora attention milega)\n✅ Founder Urvashi Trehan se direct training\n✅ Certificate + Placement Support\n✅ Real salon environment\n\nFREE trial class available this week 👇\nWhatsApp or call: 76784 46364\n\n#makeupacademy #makeupcoursedelhi #beautycareer #homemaker #secondincome #delhiwomen", size: 20, font: "Arial", color: "333333" })],
      }),
      ...spacer(2),

      // ANGLE C
      h2("Angle C — “Career Switch”"),
      labelValue("Target", "Working women 23–35 considering a change"),
      labelValue("Platform", "Instagram Reels"),
      labelValue("Format", "15 seconds"),
      ...spacer(1),
      scriptCard("ANGLE C", "15 seconds", "Instagram Reels", [
        ["0–3s\nHOOK", "Bold text on screen with trending audio:\n“Teri current job ne kabhi yeh diya?”\nThen show three lines pop up: “₹50k/month” … “Apna time” … “Creative work”"],
        ["3–8s\nSHOW", "Fast cuts: bridal look, nail art, certificate, happy student.\nVoiceover: “Makeup artist banna ek real career hai. Seekhne ke liye 6 weeks kaafi hain.”"],
        ["8–13s\nDIFF", "“Sirf 5 students. Real salon. Founder khud padhati hain. Ramesh Nagar, Delhi.”"],
        ["13–15s\nCTA", "Text on screen: “FREE TRIAL CLASS → LINK IN BIO”"],
      ]),
      ...spacer(2),

      // ANGLE D
      h2("Angle D — “Only 2 Seats Left”  (Urgency)"),
      labelValue("Target", "Anyone who has seen other content"),
      labelValue("Platform", "Stories + Reels"),
      labelValue("Format", "10 seconds — film fresh EVERY WEEK"),
      ...spacer(1),
      note("Update the number of seats each week for authenticity. Even if you change it from 2 to 3 and back, the freshness matters more than the exact number."),
      ...spacer(1),
      scriptCard("ANGLE D", "10 seconds", "Stories + Reels", [
        ["0–2s\nHOOK", "Red circle pulsing on screen.\nText: “ONLY 2 SEATS LEFT”\n“Next batch starting this week.”"],
        ["2–6s\nWHY", "Voiceover: “Blushes & Brushes never takes more than 5 students per batch. Personal attention. Real results.”"],
        ["6–10s\nCTA", "“Book your free trial TODAY.”\nText: “WhatsApp 76784 46364” or “LINK IN BIO”"],
      ]),
      ...spacer(2),

      // ANGLE E
      h2("Angle E — “Founder Story”  (Retargeting)"),
      labelValue("Target", "People who already visited your page or profile"),
      labelValue("Platform", "Instagram + Facebook Feed"),
      labelValue("Format", "45–60 seconds, sit-down, natural and relaxed"),
      ...spacer(1),
      note("This is your most important ad. Speak from the heart — don’t memorise it word-for-word. Use these as talking points."),
      ...spacer(1),
      scriptCard("ANGLE E", "45-60 seconds", "Instagram + Facebook Feed (Retargeting)", [
        ["Opening", "“Main Urvashi hoon. Aur main ek baat share karna chahti hoon jo mujhe kuch saal pehle kisi ne nahi bataaya.”"],
        ["Story", "“Jab maine makeup seekha — main ek badi class mein thi. 25–30 students. Teacher ke paas time nahi tha. Main sirf dekh kar sikhti thi. Kabhi haath se practice nahi hoti thi.”"],
        ["Decision", "“Toh jab maine Blushes & Brushes khooli — maine decide kiya: max 5 students. Kabhi zyada nahi. Kyunki main chahti hoon ki har student woh seekhe jo main seekhna chahti thi — properly, personally, professionally.”"],
        ["Proof", "“500 se zyada students trained ho chuke hain. Aur main chahti hoon ki tum bhi aakar ek baar dekho.”"],
        ["CTA", "“Free hai. Koi commitment nahi. Bas aao, dekho, aur decide karo khud.”\n[End card: logo + “76784 46364 → Free Trial Class Book Karo”]"],
      ]),

      pageBreak(),

      // ── PART 2: SHOT LIST ───────────────────────────────────
      h1("  PART 2 — SHOT LIST"),
      ...spacer(1),
      body("Film all of these in one 2-hour session. Ask a friend or student to hold the phone. Natural window light on your face is all you need."),
      ...spacer(1),
      note("Phone settings: shoot 1080p 30fps. Portrait mode OFF for wide shots, ON for talking-head. Hold landscape (sideways) for Facebook; vertical (portrait) for Reels/Stories."),
      ...spacer(2),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 2600, 1800, 4360],
        rows: [
          headerRow(["#", "Shot", "Duration", "Notes"], [600, 2600, 1800, 4360]),
          ...[
            ["1", "Urvashi talking to camera — hook lines", "30s per angle", "Good natural light, eye contact, clean background"],
            ["2", "Wide shot: full salon interior", "10 seconds", "Slow pan from left to right, show equipment"],
            ["3", "Close-up: makeup brushes laid out", "5 seconds", "Slow zoom in, warm light"],
            ["4", "Hands doing foundation on a model", "15 seconds", "Over-shoulder angle, steady hands"],
            ["5", "Hands doing nail extensions", "15 seconds", "Top-down flat lay, keep it focused"],
            ["6", "Finished bridal makeup — reveal", "10 seconds", "Model turns to camera, big smile"],
            ["7", "Urvashi teaching a student 1-on-1", "15 seconds", "Side angle, natural conversation"],
            ["8", "Certificate handed to student", "5 seconds", "Warm, celebratory moment"],
            ["9", "Outside studio entrance / sign", "5 seconds", "Daytime, clear address visible"],
            ["10", "Screen recording of 5-star reviews", "5 seconds", "Google Maps or Instagram DMs"],
            ["11", "Urvashi walking through salon", "10 seconds", "Follow-shot from behind, narrate the space"],
            ["12", "Nail art timelapse (any design)", "20 seconds", "Top-down, tripod if possible"],
          ].map(([a, b, c, d], i) => dataRow([a, b, c, d], [600, 2600, 1800, 4360], i % 2 !== 0)),
        ],
      }),

      ...spacer(2),
      h3("Editing Checklist (CapCut — free)"),
      bullet("Add auto-subtitles: Tools → Auto Captions → Hindi+English"),
      bullet("Add background music: low volume (20–30%), use a trending audio from Reels"),
      bullet("Add text overlays: hook text in first 3 seconds, phone number in last 2 seconds"),
      bullet("Export at 1080p for Instagram, 720p for Facebook Stories"),
      bullet("Keep Reels between 7–15 seconds for best reach; feed videos up to 60 seconds"),

      pageBreak(),

      // ── PART 3: INSTAGRAM STRATEGY ──────────────────────────
      h1("  PART 3 — INSTAGRAM ORGANIC STRATEGY"),
      ...spacer(1),
      body("Paid ads bring leads. Organic content builds trust. Together they compound. Post 3x/week minimum."),
      ...spacer(1),

      h2("Posting Schedule"),
      twoColTable([
        ["Tuesday 7:00 PM", "Educational or transformation content (before/after, tips)"],
        ["Thursday 7:00 PM", "Behind-the-scenes or student story"],
        ["Saturday 11:00 AM", "Course promo, urgency, or offer-driven content"],
      ]),
      ...spacer(2),

      h2("Content Mix (every 9 posts)"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2000, 1200, 6160],
        rows: [
          headerRow(["Type", "Frequency", "Examples"], [2000, 1200, 6160]),
          dataRow(["Educational", "3 of 9", "5 mistakes in bridal makeup; How to choose nail shape; Skincare before makeup"], [2000, 1200, 6160], false),
          dataRow(["Transformation", "2 of 9", "Before/after: bridal look; student’s first nail extension; makeover reel"], [2000, 1200, 6160], true),
          dataRow(["Social proof", "2 of 9", "Student testimonial, certificate moment, Google review screenshot"], [2000, 1200, 6160], false),
          dataRow(["Promo / CTA", "2 of 9", "Course graphic, seat urgency, free trial offer, batch announcement"], [2000, 1200, 6160], true),
        ],
      }),
      ...spacer(2),

      h2("Hashtag Bank"),
      body("Use 15–20 hashtags per post. Mix sizes: 2 large (1M+), 5 medium (100K–500K), 8 small (under 50K)."),
      ...spacer(1),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        shading: { fill: GRAY, type: ShadingType.CLEAR },
        indent: { left: 240 },
        children: [new TextRun({ text: "LARGE:\n#makeupacademy  #makeupschool  #beautycourse  #nailacademy\n\nMEDIUM:\n#makeupcoursedelhi  #delhimakeup  #makeuptraining  #beautyacademy  #nailextensions\n\nSMALL (hyperlocal):\n#blushesandbrushesByUrvashiTrehan  #rameshnagar  #westdelhi  #delhigirlsmakeup  #makeupindia  #nailartdelhi  #bridalmakeupdelhi  #makeupstudentlife", size: 19, font: "Courier New", color: "333333" })],
      }),

      pageBreak(),

      // ── PART 4: SUMMER CONTENT CALENDAR ─────────────────────
      h1("  PART 4 — 8-WEEK SUMMER CALENDAR"),
      ...spacer(1),
      body("Theme for the entire summer: “This summer, build a skill that pays for life.”"),
      ...spacer(1),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [800, 5160, 3400],
        rows: [
          headerRow(["Week", "3 Posts (Organic)", "Paid Ad Push"], [800, 5160, 3400]),
          ...[
            ["Wk 1\nLaunch", "1. Studio tour Reel\n2. Course graphic carousel (all 3 courses)\n3. “Meet Urvashi” talking-head", "Launch Ad Set A (students) + Ad Set B (homemakers)"],
            ["Wk 2", "1. Student testimonial (ask a graduate)\n2. “Day in the life” at B&B\n3. Nail art timelapse", "Boost top-performing organic post (₹200/day)"],
            ["Wk 3", "1. Before/after bridal makeup reveal\n2. “5 reasons micro-batch > big class” carousel\n3. FAQ in Stories (poll stickers)", "Check Cost-per-Lead. Kill ad set > ₹300 CPL. Double budget on winner."],
            ["Wk 4", "1. Certificate ceremony short clip\n2. “What ₹20,000 gets you” breakdown post\n3. Q&A Live (30 min)", "Launch Retargeting (Ad Set E — Founder Story) for page visitors"],
            ["Wk 5", "1. Student transformation story (Reel)\n2. Nail extension tutorial (3-sec hook)\n3. “Seats filling up” urgency Reel", "Scale winning ad set 2x budget"],
            ["Wk 6", "1. New batch announcement Reel\n2. Behind the scenes: sourcing products\n3. Founder Q&A in Stories", "Run Angle D (urgency) “Only 2 Seats” ad separately"],
            ["Wk 7", "1. “Last 2 seats” Reel (film fresh this week)\n2. Graduate placement story\n3. Summer recap carousel", "Max budget on best-performing ad set"],
            ["Wk 8", "1. New batch announcement (next intake)\n2. Early-bird offer for next batch\n3. Urvashi thank-you + celebration video", "Create Lookalike Audience from leads list; launch for next batch"],
          ].map(([a, b, c], i) => dataRow([a, b, c], [800, 5160, 3400], i % 2 !== 0)),
        ],
      }),

      pageBreak(),

      // ── PART 5: QUICK TIPS ──────────────────────────────────
      h1("  PART 5 — QUICK TIPS FOR MAXIMUM REACH"),
      ...spacer(1),

      h2("Filming Tips"),
      bullet("Always shoot near a window with natural light hitting your face, not behind you"),
      bullet("Use a ring light if filming at night — Rs 500–800 on Amazon"),
      bullet("Hold the phone at eye level or slightly below for confidence on camera"),
      bullet("Wear your work attire — apron or professional outfit — so it looks authentic"),
      bullet("Film 3–5 takes of each hook line; use the most natural one"),
      bullet("Keep the salon clean and products visible in background shots"),
      ...spacer(1),

      h2("Instagram Reel Tips"),
      bullet("Post Reels as your primary format — they get 3–5x more reach than static posts"),
      bullet("Use a trending audio from the Reels audio library for the first 3 seconds"),
      bullet("Reply to every comment within 1 hour of posting for algorithm boost"),
      bullet("Add a question sticker to Stories and reply to all answers personally"),
      bullet("Share every Reel to your WhatsApp Status for free reach to your contacts"),
      ...spacer(1),

      h2("WhatsApp Conversion Tips"),
      bullet("Reply to every lead within 15 minutes — conversion drops 80% after 1 hour"),
      bullet("Send a voice note instead of text — it feels personal and builds trust instantly"),
      bullet("Share 2–3 student photos when you reply to make the course feel real"),
      bullet("Always invite them to the free trial: “Aao ek baar dekho — bilkul free”"),
      bullet("Follow up once after 2 days if no response: “Hi, did you get a chance to think about it?”"),

      ...spacer(2),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 120 },
        shading: { fill: TEAL, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "All the best, Urvashi. This summer is yours.", size: 28, bold: true, color: GOLD, font: "Arial", italics: true })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        shading: { fill: TEAL, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "Blushes & Brushes  |  76784 46364  |  Ramesh Nagar, New Delhi", size: 20, color: WHITE, font: "Arial" })],
      }),
    ],
  }],
});

const outPath = path.join(__dirname, "..", "BB_Ad_Content_Brief_Summer2026.docx");
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("Created:", outPath);
});
