/**
 * Blushes & Brushes — Integrated Lead & Internal Invoicing Engine
 * 1) Paste this complete file directly into the sheet's Apps Script Editor.
 * 2) Run setupInvoiceSheet() once to provision the new tracking sheet.
 * 3) Deploy -> New Version to unlock the live API extensions.
 *
 * NOTE: This mirrors the version DEPLOYED via Gemini (source of truth).
 * The Next.js /api/invoice route is written to THIS contract:
 *   create → { action: "createInvoice", ..., totalAmount, advancePaid }
 *   status → { action: "updateInvoiceStatus", id, status }
 *   list   → GET ?action=getInvoices
 */

const BB_SHEET = "BB Leads";
const BB_INVOICE_SHEET = "BB Invoices";
const BB_FIRST_ROW = 3;
const INV_FIRST_ROW = 3;

/* ==========================================
   1. SETUP FUNCTIONS (RUN ONCE)
   ========================================== */

function setupLeadSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(BB_SHEET);
  if (!sheet) sheet = ss.insertSheet(BB_SHEET);
  sheet.activate();

  const TEAL="#1E4A3A", GOLD="#C9A066", CREAM="#F5EDD8", WHITE="#FFFFFF", ORANGE="#FDEBD0", RED="#FADBD8";
  const headers = ["#","Timestamp","Name","WhatsApp","Service","Source","Status","Appt Date","Value (₹)","Notes"];
  const widths  = [40,160,150,120,210,110,120,110,100,220];
  const NCOL = headers.length;

  sheet.setConditionalFormatRules([]);
  sheet.getBandings().forEach(b => b.remove());
  sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  sheet.getRange(1, 1, sheet.getMaxRows(), NCOL).breakApart();
  sheet.clearContents();
  sheet.clearFormats();
  sheet.getRange(3, 1, 200, NCOL).clearDataValidations();

  sheet.setRowHeight(1, 40);
  sheet.getRange(1, 1, 1, NCOL).merge();
  sheet.getRange(1, 1).setValue("  BLUSHES & BRUSHES — LEAD TRACKER  |  Summer 2026")
    .setBackground(TEAL).setFontColor(GOLD).setFontFamily("Arial").setFontSize(14).setFontWeight("bold")
    .setHorizontalAlignment("left").setVerticalAlignment("middle");

  sheet.setRowHeight(2, 30);
  sheet.getRange(2, 1, 1, NCOL).setValues([headers])
    .setBackground("#2A6355").setFontColor(WHITE).setFontFamily("Arial").setFontSize(10).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  const data = sheet.getRange(3, 1, 200, NCOL);
  data.setFontFamily("Arial").setFontSize(10).setVerticalAlignment("middle");

  const band = data.applyRowBanding();
  band.setHeaderRowColor(null).setFirstRowColor(WHITE).setSecondRowColor(CREAM);

  const f = [];
  for (let r = 3; r <= 202; r++) f.push(['=IF(C' + r + '<>"",ROW()-2,"")']);
  sheet.getRange(3, 1, 200, 1).setFormulas(f);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["New","Called","Booked","Served","Paid","Not Interested","Follow Up"], true)
    .setAllowInvalid(false).build();
  sheet.getRange(3, 7, 200, 1).setDataValidation(statusRule).setHorizontalAlignment("center");

  sheet.getRange(3, 9, 200, 1).setNumberFormat("₹#,##0").setHorizontalAlignment("center");

  const cf = sheet.getRange(3, 1, 200, NCOL);
  const mk = (f2, bg, fc) => SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(f2).setBackground(bg).setFontColor(fc).setRanges([cf]).build();
  sheet.setConditionalFormatRules([
    mk('=$G3="Paid"',"#D5F5E3","#1E8449"),
    mk('=$G3="Served"',"#D5F5E3","#1E8449"),
    mk('=$G3="Booked"',"#D6EAF8","#1A5276"),
    mk('=$G3="Called"',ORANGE,"#784212"),
    mk('=$G3="Follow Up"',"#FEF9E7","#7D6608"),
    mk('=$G3="Not Interested"',RED,"#922B21"),
  ]);

  sheet.getRange(2, 1, 201, NCOL).setBorder(true, true, true, true, true, true, "#CCCCCC", SpreadsheetApp.BorderStyle.SOLID);
  sheet.setFrozenRows(2);
  sheet.getRange(1, 1, 2, NCOL).protect().setDescription("Header — do not edit").setWarningOnly(true);

  let sm = ss.getSheetByName("📊 Summary");
  if (!sm) sm = ss.insertSheet("📊 Summary");
  sm.clearContents(); sm.clearFormats();
  sm.setColumnWidth(1, 200); sm.setColumnWidth(2, 140);
  sm.getRange(1, 1, 1, 2).merge().setValue("  CAMPAIGN SUMMARY")
    .setBackground(TEAL).setFontColor(GOLD).setFontFamily("Arial").setFontSize(13).setFontWeight("bold").setHorizontalAlignment("left");
  sm.setRowHeight(1, 36);
  const sd = [
    ["Total Leads",      "=COUNTA('BB Leads'!C3:C202)"],
    ["New",              "=COUNTIF('BB Leads'!G3:G202,\"New\")"],
    ["Called",           "=COUNTIF('BB Leads'!G3:G202,\"Called\")"],
    ["Booked",           "=COUNTIF('BB Leads'!G3:G202,\"Booked\")"],
    ["Served",           "=COUNTIF('BB Leads'!G3:G202,\"Served\")"],
    ["Paid",             "=COUNTIF('BB Leads'!G3:G202,\"Paid\")"],
    ["Not Interested",   "=COUNTIF('BB Leads'!G3:G202,\"Not Interested\")"],
    ["",                 ""],
    ["Booking Rate %",   "=IFERROR((COUNTIF('BB Leads'!G3:G202,\"Booked\")+COUNTIF('BB Leads'!G3:G202,\"Served\")+COUNTIF('BB Leads'!G3:G202,\"Paid\"))/COUNTA('BB Leads'!C3:C202)*100,0)"],
    ["Revenue Earned ₹", "=SUM('BB Leads'!I3:I202)"],
  ];
  sm.getRange(2, 1, sd.length, 1).setValues(sd.map(x => [x[0]]))
    .setFontFamily("Arial").setFontSize(10).setFontWeight("bold").setFontColor(TEAL);
  sm.getRange(2, 2, sd.length, 1).setFormulas(sd.map(x => [x[1]]))
    .setFontFamily("Arial").setFontSize(11).setFontWeight("bold").setHorizontalAlignment("center");

  SpreadsheetApp.getUi().alert("✅ BB Leads service tracker is ready!");
}

// FAST / batched — mirrors the proven setupLeadSheet (200 rows), runs in seconds.
// The Gemini 500-row version exceeded the 6-min Apps Script limit; this fixes that.
function setupInvoiceSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(BB_INVOICE_SHEET);
  if (!sheet) sheet = ss.insertSheet(BB_INVOICE_SHEET);
  sheet.activate();

  const TEAL="#1E4A3A", GOLD="#C9A066", CREAM="#F5EDD8", WHITE="#FFFFFF";
  const headers = ["Invoice ID", "Timestamp", "Customer Name", "WhatsApp", "Invoice Date", "Event Date", "Services", "Total (₹)", "Advance (₹)", "Due (₹)", "Status"];
  const widths  = [110, 150, 150, 120, 100, 100, 210, 90, 100, 90, 120];
  const NCOL = headers.length;
  const ROWS = 200;

  // Clean slate (batched)
  sheet.setConditionalFormatRules([]);
  sheet.getBandings().forEach(b => b.remove());
  sheet.getRange(1, 1, sheet.getMaxRows(), NCOL).breakApart();
  sheet.clearContents();
  sheet.clearFormats();
  sheet.getRange(3, 1, ROWS, NCOL).clearDataValidations();

  // Title
  sheet.setRowHeight(1, 40);
  sheet.getRange(1, 1, 1, NCOL).merge();
  sheet.getRange(1, 1).setValue("  BLUSHES & BRUSHES — INTERNAL INVOICE LEDGER  |  No GST")
    .setBackground(TEAL).setFontColor(GOLD).setFontFamily("Arial").setFontSize(13).setFontWeight("bold")
    .setHorizontalAlignment("left").setVerticalAlignment("middle");

  // Header row
  sheet.setRowHeight(2, 30);
  sheet.getRange(2, 1, 1, NCOL).setValues([headers])
    .setBackground("#2A6355").setFontColor(WHITE).setFontFamily("Arial").setFontSize(10).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Data area — one format pass
  const data = sheet.getRange(3, 1, ROWS, NCOL);
  data.setFontFamily("Arial").setFontSize(10).setVerticalAlignment("middle");
  const band = data.applyRowBanding();
  band.setHeaderRowColor(null).setFirstRowColor(WHITE).setSecondRowColor(CREAM);

  // Due (J) auto-formula — one batch call
  const dueFormulas = [];
  for (let r = 3; r <= ROWS + 2; r++) dueFormulas.push(['=IF(C' + r + '<>"", H' + r + '-I' + r + ',"")']);
  sheet.getRange(3, 10, ROWS, 1).setFormulas(dueFormulas).setHorizontalAlignment("center");

  // Currency H, I, J
  sheet.getRange(3, 8, ROWS, 3).setNumberFormat("₹#,##0").setHorizontalAlignment("center");

  // Status dropdown (K)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "Partially Paid", "Fully Paid"], true)
    .setAllowInvalid(false).build();
  sheet.getRange(3, 11, ROWS, 1).setDataValidation(statusRule).setHorizontalAlignment("center");

  // Status colours
  const cf = sheet.getRange(3, 1, ROWS, NCOL);
  const mk = (f, bg, fc) => SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(f).setBackground(bg).setFontColor(fc).setRanges([cf]).build();
  sheet.setConditionalFormatRules([
    mk('=$K3="Fully Paid"',      "#D5F5E3", "#1E8449"),
    mk('=$K3="Partially Paid"',  "#FEF9E7", "#7D6608"),
    mk('=$K3="Pending"',         "#FADBD8", "#922B21"),
  ]);

  sheet.setFrozenRows(2);
  SpreadsheetApp.getUi().alert("✅ BB Invoices ledger is ready!");
}

/* ==========================================
   2. CORE WEBHOOKS & ROUTING (doPost & doGet)
   ========================================== */

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // Route 1: Create Invoice
    if (d.action === "createInvoice") {
      const res = handleInvoiceTransaction(d);
      return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
    }

    // Route 2: Update Status
    if (d.action === "updateInvoiceStatus") {
      const res = handleInvoiceStatusUpdate(d.id, d.status);
      return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
    }

    // Route 3: Log a review (Google/Justdial/magicpin) → Reviews tab
    if (d.type === "review") {
      return bbLogReview(d);
    }

    // Default Route: Standard Lead Intake Funnel
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BB_SHEET);
    const row = bbFirstEmptyRow(sheet);
    sheet.getRange(row, 2, 1, 6).setValues([[
      d.timestamp || new Date().toISOString(),
      d.name || "",
      d.phone || d.whatsapp || "",
      d.service || d.course || "",
      d.source || "landing-page",
      "New"
    ]]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Custom Action: Pull reviews for the frontend tracker
  if (e.parameter.action === "getReviews") return bbListReviews();

  // Custom Action: Pull Invoice Tracks for the frontend table view
  if (e.parameter.action === "getInvoices") {
    const sheet = ss.getSheetByName(BB_INVOICE_SHEET);
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({invoices:[]})).setMimeType(ContentService.MimeType.JSON);

    const maxRows = sheet.getLastRow();
    if (maxRows < INV_FIRST_ROW) return ContentService.createTextOutput(JSON.stringify({invoices:[]})).setMimeType(ContentService.MimeType.JSON);

    const vals = sheet.getRange(INV_FIRST_ROW, 1, maxRows - INV_FIRST_ROW + 1, 11).getValues();
    const invoices = [];

    vals.forEach(r => {
      if (!r[2]) return; // Skip if customer name is empty
      invoices.push({
        id: r[0],
        timestamp: r[1],
        name: r[2],
        whatsapp: r[3],
        invoiceDate: r[4],
        eventDate: r[5],
        services: r[6],
        total: Number(r[7]) || 0,
        advance: Number(r[8]) || 0,
        due: Number(r[9]) || 0,
        status: r[10] || "Pending"
      });
    });
    return ContentService.createTextOutput(JSON.stringify({invoices})).setMimeType(ContentService.MimeType.JSON);
  }

  // Fallback / Default Action: Existing Analytics Stats Pipeline
  const sheet = ss.getSheetByName(BB_SHEET);
  const n = sheet.getMaxRows() - BB_FIRST_ROW + 1;
  const vals = sheet.getRange(BB_FIRST_ROW, 1, n, 10).getValues();
  const byService = {"Makeup":0,"Nail Art":0,"Beauty":0};
  const bySegment = {makeup_bridal:0,makeup_party:0,nails:0,beauty:0,other:0};
  const funnel = {leads:0,contacted:0,booked:0,served:0};
  let total=0, byWeek=0, services=0;
  const now=Date.now(), WEEK=7*864e5;
  const C=["called","booked","served","paid","follow up"], B=["booked","served","paid"], S=["served","paid"];
  vals.forEach(r=>{
    const name=r[2], phone=r[3]; if(!name && !phone) return;
    total++;
    const ts=new Date(r[1]).getTime(); if(!isNaN(ts)&&now-ts<WEEK) byWeek++;
    const c=bbClassify(r[4]); byService[c[0]]++; bySegment[c[1]]++;
    funnel.leads++;
    const st=String(r[6]||"").toLowerCase(), appt=r[7], val=Number(r[8])||0;
    if(C.indexOf(st)>=0) funnel.contacted++;
    if(B.indexOf(st)>=0||appt) funnel.booked++;
    if(S.indexOf(st)>=0) funnel.served++;
    services += val;
  });
  return ContentService.createTextOutput(JSON.stringify({total,byWeek,byService,bySegment,funnel,revenue:{services,total:services}})).setMimeType(ContentService.MimeType.JSON);
}

/* ==========================================
   3. INTERNAL OPERATIONS HELPERS
   ========================================== */

function bbFirstEmptyRow(sheet){
  const n = sheet.getMaxRows() - BB_FIRST_ROW + 1;
  const col = sheet.getRange(BB_FIRST_ROW, 3, n, 1).getValues();
  for (let i = 0; i < col.length; i++) if (!col[i][0]) return BB_FIRST_ROW + i;
  return sheet.getMaxRows() + 1;
}

function handleInvoiceTransaction(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(BB_INVOICE_SHEET);

  const maxRows = sheet.getMaxRows();
  let targetRow = INV_FIRST_ROW;
  const colCValues = sheet.getRange(INV_FIRST_ROW, 3, maxRows - INV_FIRST_ROW + 1, 1).getValues();
  for (let i = 0; i < colCValues.length; i++) {
    if (!colCValues[i][0]) {
      targetRow = INV_FIRST_ROW + i;
      break;
    }
  }

  const currentCount = targetRow - INV_FIRST_ROW + 1;
  const pad = String(currentCount).padStart(3, '0');
  const invoiceId = "BB-2026-" + pad;

  sheet.getRange(targetRow, 1, 1, 9).setValues([[
    invoiceId,
    new Date().toISOString(),
    d.customerName || "",
    d.whatsapp || "",
    d.invoiceDate || new Date().toLocaleDateString('en-IN'),
    d.eventDate || "—",
    d.services || "",
    Number(d.totalAmount) || 0,
    Number(d.advancePaid) || 0
  ]]);

  sheet.getRange(targetRow, 11).setValue(d.status || "Pending");
  return { ok: true, invoiceId: invoiceId };
}

function handleInvoiceStatusUpdate(invoiceId, newStatus) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(BB_INVOICE_SHEET);
  const lastRow = sheet.getLastRow();
  if (lastRow < INV_FIRST_ROW) return { ok: false, error: "Empty database" };

  const data = sheet.getRange(INV_FIRST_ROW, 1, lastRow - INV_FIRST_ROW + 1, 1).getValues();
  for(let i=0; i<data.length; i++) {
    if(data[i][0] === invoiceId) {
      sheet.getRange(INV_FIRST_ROW + i, 11).setValue(newStatus);
      return { ok: true };
    }
  }
  return { ok: false, error: "Invoice target mismatch" };
}

function bbClassify(s){
  s = String(s||"").toLowerCase();
  if(/bridal|sagan|reception|dulhan/.test(s)) return ["Makeup","makeup_bridal"];
  if(/party|engage|roka|baby shower|cocktail|sangeet|mehndi|makeup|mua|airbrush/.test(s)) return ["Makeup","makeup_party"];
  if(/nail|extension|gel|manicure|pedicure/.test(s)) return ["Nail Art","nails"];
  if(/keratin|spa|laser|facial|hydra|cleanup|bleach|wax|thread|head wash|smoothen|botox|skin|body|beauty/.test(s)) return ["Beauty","beauty"];
  return ["Beauty","other"];
}

/* ══════════════════════════════════════════════════════════════════
   § REVIEWS — daily review tracker for staff payout gamification
   Sheet: "Reviews" · Row 3+ · Columns:
   A #(auto) B Timestamp C Date(YYYY-MM-DD) D Person E Platform F Photo G Client H Note
   Run setupReviewsSheet() once, then re-deploy the web app (same /exec).
═══════════════════════════════════════════════════════════════════ */
const REV_SHEET = "Reviews";
const REV_FIRST_ROW = 3;
const REV_NCOL = 8;

function revSheet_(){ return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REV_SHEET); }
function revFirstEmptyRow_(sheet){
  const n = sheet.getMaxRows() - REV_FIRST_ROW + 1;
  const col = sheet.getRange(REV_FIRST_ROW, 2, n, 1).getValues();
  for (let i = 0; i < col.length; i++) if (!col[i][0]) return REV_FIRST_ROW + i;
  return sheet.getMaxRows() + 1;
}

function bbLogReview(d){
  const sheet = revSheet_();
  if (!sheet) return jsonOut_({ok:false, error:"Run setupReviewsSheet() first"});
  const row = revFirstEmptyRow_(sheet);
  sheet.getRange(row, 2, 1, REV_NCOL - 1).setValues([[
    d.timestamp || new Date().toISOString(),
    d.date || (new Date().toISOString().slice(0,10)),
    d.person || "",
    d.platform || "",
    d.photo === true ? "TRUE" : "FALSE",
    d.clientName || "",
    d.note || ""
  ]]);
  return jsonOut_({ok:true});
}

function bbListReviews(){
  const sheet = revSheet_();
  if (!sheet) return jsonOut_({rows:[]});
  const last = sheet.getLastRow();
  if (last < REV_FIRST_ROW) return jsonOut_({rows:[]});
  const vals = sheet.getRange(REV_FIRST_ROW, 1, last - REV_FIRST_ROW + 1, REV_NCOL).getValues();
  const out = [];
  vals.forEach(function(r){
    if (!r[1]) return; // no timestamp = empty
    out.push({
      id: "rv-" + r[0],
      timestamp: r[1],
      date: String(r[2] || "").slice(0,10),
      person: r[3] || "",
      platform: r[4] || "",
      photo: r[5] === true || String(r[5]).toUpperCase() === "TRUE",
      clientName: r[6] || "",
      note: r[7] || ""
    });
  });
  return jsonOut_({rows: out});
}

function setupReviewsSheet(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(REV_SHEET);
  if (!sheet) sheet = ss.insertSheet(REV_SHEET);
  sheet.activate();

  const TEAL="#1A5A54", GOLD="#C9A55C", CREAM="#FBF4EA", WHITE="#FFFFFF";
  const headers = ["#","Timestamp","Date","Person","Platform","Photo","Client Name","Note"];
  const widths  = [50,160,90,90,90,60,150,220];
  const ROWS = 500;

  sheet.setConditionalFormatRules([]);
  sheet.getBandings().forEach(function(b){ b.remove(); });
  sheet.getRange(1, 1, sheet.getMaxRows(), REV_NCOL).breakApart();
  sheet.clearContents(); sheet.clearFormats();
  sheet.getRange(3, 1, ROWS, REV_NCOL).clearDataValidations();

  sheet.setRowHeight(1, 40);
  sheet.getRange(1, 1, 1, REV_NCOL).merge();
  sheet.getRange(1, 1).setValue("  BLUSHES & BRUSHES — DAILY REVIEWS LEDGER")
    .setBackground(TEAL).setFontColor(GOLD).setFontFamily("Arial").setFontSize(13).setFontWeight("bold")
    .setHorizontalAlignment("left").setVerticalAlignment("middle");

  sheet.setRowHeight(2, 30);
  sheet.getRange(2, 1, 1, REV_NCOL).setValues([headers])
    .setBackground("#2E8B83").setFontColor(WHITE).setFontFamily("Arial").setFontSize(10).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  widths.forEach(function(w, i){ sheet.setColumnWidth(i + 1, w); });

  // Auto-number (A)
  const f = [];
  for (let r = 3; r <= ROWS + 2; r++) f.push(['=IF(B' + r + '<>"",ROW()-2,"")']);
  sheet.getRange(3, 1, ROWS, 1).setFormulas(f).setHorizontalAlignment("center");

  const data = sheet.getRange(3, 1, ROWS, REV_NCOL);
  data.setFontFamily("Arial").setFontSize(10).setVerticalAlignment("middle");
  const band = data.applyRowBanding();
  band.setHeaderRowColor(null).setFirstRowColor(WHITE).setSecondRowColor(CREAM);

  // Validations
  const persons = SpreadsheetApp.newDataValidation().requireValueInList(["Urvashi","Kukkie","Asha"], true).setAllowInvalid(false).build();
  sheet.getRange(3, 4, ROWS, 1).setDataValidation(persons).setHorizontalAlignment("center");
  const plats = SpreadsheetApp.newDataValidation().requireValueInList(["Google","Justdial","magicpin"], true).setAllowInvalid(false).build();
  sheet.getRange(3, 5, ROWS, 1).setDataValidation(plats).setHorizontalAlignment("center");
  const bools = SpreadsheetApp.newDataValidation().requireValueInList(["TRUE","FALSE"], true).setAllowInvalid(false).build();
  sheet.getRange(3, 6, ROWS, 1).setDataValidation(bools).setHorizontalAlignment("center");

  sheet.setFrozenRows(2);
  SpreadsheetApp.getUi().alert("✅ Reviews ledger is ready!");
}
