# BB Lead Gen Webhook Setup
## The landing page is live. Leads are being LOST because WEBHOOK_URL is a placeholder.

### Fix in 10 minutes using Google Apps Script (free, no account needed beyond Google)

**Step 1: Create the Google Sheet**
1. Go to sheets.google.com → New Sheet
2. Name it: "BB Leads"
3. Add headers in Row 1: `Timestamp | Name | Phone | Course | Source`

**Step 2: Create the Apps Script Webhook**
1. In the Sheet: Extensions → Apps Script
2. Delete default code, paste this:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSheet();
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.phone,
      data.course,
      data.source || 'landing-page'
    ]);
    
    // WhatsApp notification to Urvashi via CallMeBot (free)
    // Setup at callmebot.com/blog/free-whatsapp-messages-api/
    const URVASHI_PHONE = "+917678446364"; // Update this
    const CALLMEBOT_KEY = "YOUR_CALLMEBOT_KEY"; // Get from callmebot.com
    const msg = encodeURIComponent(
      `🌸 New BB Lead!\nName: ${data.name}\nPhone: ${data.phone}\nCourse: ${data.course}\nTime: ${new Date().toLocaleString('en-IN')}`
    );
    UrlFetchApp.fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${URVASHI_PHONE}&text=${msg}&apikey=${CALLMEBOT_KEY}`
    );
    
    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click Deploy → New Deployment → Web App
4. Execute as: Me | Who has access: Anyone
5. Copy the Web App URL — this is your WEBHOOK_URL

**Step 3: Add WEBHOOK_URL to Vercel**
1. Go to vercel.com → bb-landing project → Settings → Environment Variables
2. Add: `WEBHOOK_URL` = [your Apps Script URL from Step 2]
3. Redeploy

**Step 4: Setup CallMeBot for WhatsApp**
1. Go to callmebot.com/blog/free-whatsapp-messages-api/
2. Add their number to Urvashi's WhatsApp contacts
3. Send them "I allow callmebot to send me messages"
4. They'll send you an API key — put it in the script above

**That's it. Every lead now:**
- Goes to Google Sheet (you can see in real time)
- Sends WhatsApp notification to Urvashi's phone immediately
- Timestamps everything

**Cost: ₹0**
