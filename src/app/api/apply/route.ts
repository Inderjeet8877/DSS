import { NextRequest, NextResponse } from "next/server";
import { JobApplicationSchema } from "@/lib/validation/schemas";
import { checkRateLimit } from "@/lib/services/rateLimit";

export async function POST(req: NextRequest) {
  // 1. Basic Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
  const allowed = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // 2. Input Validation via Zod
    const validationResult = JobApplicationSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const validData = validationResult.data;

    // 3. Google Apps Script Web App Forwarding
    const scriptUrl = process.env.APPS_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("APPS_SCRIPT_URL environment variable is missing.");
      // In production, we'll return a graceful success or mock success to avoid exposing backend config details,
      // but here we'll return a clean message so the system can be configured.
      return NextResponse.json(
        { error: "Backend integration configuration missing (APPS_SCRIPT_URL)." },
        { status: 500 }
      );
    }

    const payload = {
      type: "application",
      data: validData,
    };

    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const scriptResultText = await scriptResponse.text();
    let scriptResult: any = {};
    try {
      scriptResult = JSON.parse(scriptResultText);
    } catch {
      scriptResult = { status: "unknown", raw: scriptResultText };
    }

    if (!scriptResponse.ok || scriptResult.status === "error") {
      console.error("Apps Script returned error:", scriptResult);
      return NextResponse.json(
        { error: scriptResult.message || "Failed to log application to Google Sheets." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully." });
  } catch (error: any) {
    console.error("Error in /api/apply:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
