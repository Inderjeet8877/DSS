/**
 * Google Apps Script Web App for DSS Talent Bridge Backend Integration
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any code in Code.gs and paste this script.
 * 4. Configure the ADMIN_EMAIL below.
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Select Type: "Web app".
 * 7. Configure:
 *    - Description: DSS Talent Bridge API Handler
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial so Next.js serverless routes can call it)
 * 8. Click Deploy, authorize permissions, and copy the "Web app URL".
 * 9. Save this URL in your Next.js project's `.env.local` as APPS_SCRIPT_URL.
 */

// Configuration
var ADMIN_EMAIL = "recruitment@dsstalentbridge.com"; // Change to your destination email

function doPost(e) {
  try {
    // Parse the incoming JSON post body
    var jsonString = e.postData.contents;
    var payload = JSON.parse(jsonString);
    
    var type = payload.type;
    var data = payload.data;
    
    if (!type || !data) {
      return responseJson({ status: "error", message: "Invalid payload layout. Type or Data missing." });
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date();
    
    if (type === "application") {
      // 1. Process Job Application (Find Jobs Tab)
      var appSheet = getOrCreateSheet(sheet, "Find Jobs", [
        "Timestamp", "Candidate Name", "Email", "Phone", "Resume Link", "Cover Letter", "Job ID", "Job Title"
      ]);
      
      appSheet.appendRow([
        timestamp,
        data.name,
        data.email,
        data.phone,
        data.resumeLink,
        data.coverLetter,
        data.jobId || "N/A",
        data.jobTitle || "General Application"
      ]);
      
      sendApplicationEmail(data, timestamp);
      
    } else if (type === "hiring_post") {
      // 2. Process Client Hiring Intake (Hire Talent Tab)
      var hireSheet = getOrCreateSheet(sheet, "Hire Talent", [
        "Timestamp", "Company Name", "Contact Name", "Contact Email", "Contact Phone", "Role to Fill", "Tech Stack", "Location Preference", "Role Description"
      ]);
      
      hireSheet.appendRow([
        timestamp,
        data.companyName,
        data.contactName,
        data.contactEmail,
        data.contactPhone,
        data.roleTitle,
        data.techStack,
        data.locationPreference,
        data.description
      ]);
      
      sendHiringEmail(data, timestamp);
      
    } else if (type === "contact") {
      // 3. Process Contact Inquiry (Contact Us Tab)
      var contactSheet = getOrCreateSheet(sheet, "Contact Us", [
        "Timestamp", "Name", "Email", "Phone", "Subject", "Enquiry Type", "Message"
      ]);
      
      contactSheet.appendRow([
        timestamp,
        data.name,
        data.email,
        data.phone,
        data.subject,
        data.enquiryType,
        data.message
      ]);
      
      sendContactEmail(data, timestamp);
      
    } else {
      return responseJson({ status: "error", message: "Unknown submission type: " + type });
    }
    
    return responseJson({ status: "success", message: "Data logged successfully." });
    
  } catch (err) {
    Logger.log(err.toString());
    return responseJson({ status: "error", message: err.toString() });
  }
}

/**
 * Gets or creates a sheet tab with header formatting.
 */
function getOrCreateSheet(spreadsheet, name, headers) {
  var sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headers);
    // Format headers
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0B2240");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    // Autofit columns
    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * Sends a styled HTML email alert for job applications.
 */
function sendApplicationEmail(data, timestamp) {
  var subject = "New Job Application: " + (data.jobTitle || "General") + " - " + data.name;
  
  var htmlBody = 
    "<div style='font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;'>" +
    "  <div style='background-color: #0B2240; color: #ffffff; padding: 24px; text-align: center;'>" +
    "    <h2 style='margin: 0; font-size: 20px;'>DSS Talent Bridge</h2>" +
    "    <p style='margin: 4px 0 0 0; font-size: 13px; color: #D4AF37; text-transform: uppercase; font-weight: bold;'>New Candidate Application</p>" +
    "  </div>" +
    "  <div style='padding: 24px; background-color: #ffffff; color: #334155;'>" +
    "    <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; width: 140px;'>Candidate Name:</td><td style='padding: 10px 0;'>" + data.name + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Email:</td><td style='padding: 10px 0;'><a href='mailto:" + data.email + "'>" + data.email + "</a></td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Phone Number:</td><td style='padding: 10px 0;'>" + data.phone + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Applied For:</td><td style='padding: 10px 0;'>" + (data.jobTitle || "General Application") + " (ID: " + (data.jobId || "N/A") + ")</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Resume Link:</td><td style='padding: 10px 0;'><a href='" + data.resumeLink + "' target='_blank' style='color: #B89047; font-weight: bold;'>View Resume Document</a></td></tr>" +
    "      <tr><td style='padding: 10px 0; font-weight: bold;' valign='top'>Cover Letter:</td><td style='padding: 10px 0; white-space: pre-wrap; line-height: 1.5; color: #475569;'>" + data.coverLetter + "</td></tr>" +
    "    </table>" +
    "  </div>" +
    "  <div style='background-color: #f8fafc; padding: 16px; border-t: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;'>" +
    "    Logged at: " + timestamp.toLocaleString() + " | DSS Talent Bridge Recruitment Portal" +
    "  </div>" +
    "</div>";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Sends a styled HTML email alert for employer intakes.
 */
function sendHiringEmail(data, timestamp) {
  var subject = "New Client Requirement: " + data.roleTitle + " - " + data.companyName;
  
  var htmlBody = 
    "<div style='font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;'>" +
    "  <div style='background-color: #0B2240; color: #ffffff; padding: 24px; text-align: center;'>" +
    "    <h2 style='margin: 0; font-size: 20px;'>DSS Talent Bridge</h2>" +
    "    <p style='margin: 4px 0 0 0; font-size: 13px; color: #D4AF37; text-transform: uppercase; font-weight: bold;'>New Employer Lead</p>" +
    "  </div>" +
    "  <div style='padding: 24px; background-color: #ffffff; color: #334155;'>" +
    "    <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; width: 140px;'>Company Name:</td><td style='padding: 10px 0;'>" + data.companyName + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Contact Person:</td><td style='padding: 10px 0;'>" + data.contactName + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Business Email:</td><td style='padding: 10px 0;'><a href='mailto:" + data.contactEmail + "'>" + data.contactEmail + "</a></td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Contact Phone:</td><td style='padding: 10px 0;'>" + data.contactPhone + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Role to Fill:</td><td style='padding: 10px 0;'>" + data.roleTitle + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Required Stack:</td><td style='padding: 10px 0;'>" + data.techStack + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Location Bias:</td><td style='padding: 10px 0;'>" + data.locationPreference + "</td></tr>" +
    "      <tr><td style='padding: 10px 0; font-weight: bold;' valign='top'>Description:</td><td style='padding: 10px 0; white-space: pre-wrap; line-height: 1.5; color: #475569;'>" + data.description + "</td></tr>" +
    "    </table>" +
    "  </div>" +
    "  <div style='background-color: #f8fafc; padding: 16px; border-t: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;'>" +
    "    Logged at: " + timestamp.toLocaleString() + " | DSS Talent Bridge Employer Portal" +
    "  </div>" +
    "</div>";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Sends a styled HTML email alert for contact/collaboration submissions.
 */
function sendContactEmail(data, timestamp) {
  var subject = "New Contact Inquiry [" + data.enquiryType + "]: " + data.subject;
  
  var htmlBody = 
    "<div style='font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;'>" +
    "  <div style='background-color: #0B2240; color: #ffffff; padding: 24px; text-align: center;'>" +
    "    <h2 style='margin: 0; font-size: 20px;'>DSS Talent Bridge</h2>" +
    "    <p style='margin: 4px 0 0 0; font-size: 13px; color: #D4AF37; text-transform: uppercase; font-weight: bold;'>New Contact Submission</p>" +
    "  </div>" +
    "  <div style='padding: 24px; background-color: #ffffff; color: #334155;'>" +
    "    <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; width: 140px;'>Name:</td><td style='padding: 10px 0;'>" + data.name + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Email:</td><td style='padding: 10px 0;'><a href='mailto:" + data.email + "'>" + data.email + "</a></td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Phone:</td><td style='padding: 10px 0;'>" + data.phone + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Enquiry Type:</td><td style='padding: 10px 0; font-weight: bold; color: #B89047;'>" + data.enquiryType + "</td></tr>" +
    "      <tr style='border-b: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold;'>Subject:</td><td style='padding: 10px 0;'>" + data.subject + "</td></tr>" +
    "      <tr><td style='padding: 10px 0; font-weight: bold;' valign='top'>Message:</td><td style='padding: 10px 0; white-space: pre-wrap; line-height: 1.5; color: #475569;'>" + data.message + "</td></tr>" +
    "    </table>" +
    "  </div>" +
    "  <div style='background-color: #f8fafc; padding: 16px; border-t: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;'>" +
    "    Logged at: " + timestamp.toLocaleString() + " | DSS Talent Bridge Contact Center" +
    "  </div>" +
    "</div>";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Formats JSON response outputs.
 */
function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
