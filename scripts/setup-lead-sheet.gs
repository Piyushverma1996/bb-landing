/**
 * Blushes & Brushes — Google Apps Script
 * Paste this entire file into script.google.com → Run setupLeadSheet()
 * It will format the active spreadsheet as the BB Leads tracker.
 */

function setupLeadSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("BB Leads");
  if (!sheet) sheet = ss.insertSheet("BB Leads");
  sheet.activate();
  sheet.setFrozenRows(0);
  sheet.setFrozenColumns(0);
  sheet.clearContents();
  sheet.clearFormats();

  // ── Colours ─────────────────────────────────────────────────
  const TEAL   = "#1E4A3A";
  const GOLD   = "#C9A066";
  const CREAM  = "#F5EDD8";
  const LIGHT  = "#EDE0C4";
  const WHITE  = "#FFFFFF";
  const GREEN  = "#D5F5E3";
  const ORANGE = "#FDEBD0";
  const RED    = "#FADBD8";

  // ── Headers ──────────────────────────────────────────────────
  const headers = [
    "#", "Timestamp", "Name", "WhatsApp", "Course", "Source",
    "Status", "Trial Date", "Enrolled?", "Notes"
  ];
  const widths = [40, 160, 140, 110, 180, 100, 120, 110, 90, 220];

  // ── Title row ────────────────────────────────────────────────
  const titleRange = sheet.getRange(1, 1, 1, headers.length);
  sheet.setRowHeight(1, 40);
  titleRange.merge();
  titleRange.setValue("BLUSHES & BRUSHES — LEAD TRACKER  |  Summer 2026");
  titleRange.setBackground(TEAL).setFontColor(GOLD)
    .setFontFamily("Arial").setFontSize(14).setFontWeight("bold")
    .setHorizontalAlignment("left").setVerticalAlignment("middle");
  titleRange.getCell(1,1).setValue("  BLUSHES & BRUSHES — LEAD TRACKER  |  Summer 2026");

  // ── Header row ───────────────────────────────────────────────
  const headerRange = sheet.getRange(2, 1, 1, headers.length);
  sheet.setRowHeight(2, 30);
  headerRange.setValues([headers]);
  headerRange.setBackground("#2A6355").setFontColor(WHITE)
    .setFontFamily("Arial").setFontSize(10).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  // ── Column widths ────────────────────────────────────────────
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // ── Data rows: 200 pre-formatted rows ────────────────────────
  const dataRange = sheet.getRange(3, 1, 200, headers.length);
  dataRange.setBackground(WHITE).setFontFamily("Arial").setFontSize(10)
    .setVerticalAlignment("middle");

  // Alternating row tint (conditional on even/odd row number)
  for (let r = 3; r <= 202; r++) {
    if (r % 2 === 0) {
      sheet.getRange(r, 1, 1, headers.length).setBackground(CREAM);
    }
  }

  // Auto-number column A
  for (let r = 3; r <= 202; r++) {
    sheet.getRange(r, 1).setFormula(`=IF(C${r}<>"",ROW()-2,"")`);
  }

  // ── Status dropdown ──────────────────────────────────────────
  const statusRange = sheet.getRange(3, 7, 200, 1);
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["New","Called","Trial Booked","Trial Done","Enrolled","Not Interested","Follow Up"], true)
    .setAllowInvalid(false).build();
  statusRange.setDataValidation(statusRule);
  statusRange.setHorizontalAlignment("center");

  // ── Enrolled dropdown ────────────────────────────────────────
  const enrollRange = sheet.getRange(3, 9, 200, 1);
  const enrollRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Yes","No","Pending"], true)
    .setAllowInvalid(false).build();
  enrollRange.setDataValidation(enrollRule);
  enrollRange.setHorizontalAlignment("center");

  // ── Conditional formatting for Status ────────────────────────
  const cf = sheet.getRange(3, 1, 200, headers.length);

  const rules = [
    { formula: `=$G3="Enrolled"`,        bg: "#D5F5E3", color: "#1E8449" },
    { formula: `=$G3="Trial Booked"`,    bg: "#D6EAF8", color: "#1A5276" },
    { formula: `=$G3="Trial Done"`,      bg: "#EBF5FB", color: "#1A5276" },
    { formula: `=$G3="Called"`,          bg: ORANGE,    color: "#784212" },
    { formula: `=$G3="Not Interested"`,  bg: RED,       color: "#922B21" },
    { formula: `=$G3="Follow Up"`,       bg: "#FEF9E7", color: "#7D6608" },
  ].map(r =>
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(r.formula)
      .setBackground(r.bg).setFontColor(r.color)
      .setRanges([cf]).build()
  );
  sheet.setConditionalFormatRules(rules);

  // ── Borders ──────────────────────────────────────────────────
  sheet.getRange(2, 1, 201, headers.length)
    .setBorder(true, true, true, true, true, true, "#CCCCCC",
               SpreadsheetApp.BorderStyle.SOLID);

  // ── Freeze header rows ───────────────────────────────────────
  // Only freeze rows — freezing columns conflicts with the merged title row
  sheet.setFrozenRows(2);

  // ── Summary sheet ────────────────────────────────────────────
  let summary = ss.getSheetByName("📊 Summary");
  if (!summary) summary = ss.insertSheet("📊 Summary");
  summary.clearContents();
  summary.clearFormats();
  summary.setColumnWidth(1, 200);
  summary.setColumnWidth(2, 120);

  const sumTitle = summary.getRange(1, 1, 1, 2);
  sumTitle.merge();
  sumTitle.setValue("  CAMPAIGN SUMMARY");
  sumTitle.setBackground(TEAL).setFontColor(GOLD).setFontFamily("Arial")
    .setFontSize(13).setFontWeight("bold").setHorizontalAlignment("left");
  summary.setRowHeight(1, 36);

  const sumData = [
    ["Total Leads",       `=COUNTA('BB Leads'!C3:C202)`],
    ["New (not called)",  `=COUNTIF('BB Leads'!G3:G202,"New")`],
    ["Called",            `=COUNTIF('BB Leads'!G3:G202,"Called")`],
    ["Trial Booked",      `=COUNTIF('BB Leads'!G3:G202,"Trial Booked")`],
    ["Trial Done",        `=COUNTIF('BB Leads'!G3:G202,"Trial Done")`],
    ["Enrolled",          `=COUNTIF('BB Leads'!G3:G202,"Enrolled")`],
    ["Not Interested",    `=COUNTIF('BB Leads'!G3:G202,"Not Interested")`],
    ["--- ","---"],
    ["Trial Rate %",      `=IFERROR(COUNTIF('BB Leads'!G3:G202,"Trial Booked")/COUNTA('BB Leads'!C3:C202)*100,0)`],
    ["Enrolment Rate %",  `=IFERROR(COUNTIF('BB Leads'!G3:G202,"Enrolled")/COUNTA('BB Leads'!C3:C202)*100,0)`],
    ["Revenue Earned ₹",  `=COUNTIF('BB Leads'!G3:G202,"Enrolled")*20000`],
  ];

  sumData.forEach(([label, formula], i) => {
    const r = i + 2;
    summary.setRowHeight(r, 24);
    const lc = summary.getRange(r, 1);
    lc.setValue(label).setFontFamily("Arial").setFontSize(10).setFontWeight("bold")
      .setFontColor(TEAL).setBackground(i % 2 === 0 ? CREAM : WHITE)
      .setVerticalAlignment("middle");
    const vc = summary.getRange(r, 2);
    vc.setFormula(formula).setFontFamily("Arial").setFontSize(11).setFontWeight("bold")
      .setFontColor("#1A1A1A").setBackground(i % 2 === 0 ? CREAM : WHITE)
      .setHorizontalAlignment("center").setVerticalAlignment("middle");
  });

  // ── Protect header rows ──────────────────────────────────────
  const protection = sheet.getRange(1, 1, 2, headers.length).protect();
  protection.setDescription("Header — do not edit");
  protection.setWarningOnly(true);

  SpreadsheetApp.getUi().alert(
    "✅ BB Leads sheet is ready!\n\n" +
    "Next step:\n" +
    "1. Copy this spreadsheet's ID from the URL\n" +
    "2. Paste it into the Make.com blueprint (google-sheets module → spreadsheetId)\n\n" +
    "Sheet ID is the long string between /d/ and /edit in the URL."
  );
}
