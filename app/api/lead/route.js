import { NextResponse } from "next/server";

function sanitize(value) {
  return String(value || "").trim().slice(0, 1500);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = {
    name: sanitize(payload.name),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    lawnSize: sanitize(payload.lawnSize),
    recommendedPhase: sanitize(payload.recommendedPhase),
    notes: sanitize(payload.notes)
  };

  if (!inquiry.name || !isEmail(inquiry.email)) {
    return NextResponse.json({ message: "Please include a valid name and email." }, { status: 422 });
  }

  const to = process.env.GREENIQ_INQUIRY_TO || process.env.GREENIQ_LEAD_TO;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "GreenIQ <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0b1710">
      <h1 style="margin:0 0 16px;font-size:24px">New GreenIQ lawn plan inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone || "Not provided")}</p>
      <p><strong>Lawn size:</strong> ${escapeHtml(inquiry.lawnSize || "Not provided")}</p>
      <p><strong>Recommended phase:</strong> ${escapeHtml(inquiry.recommendedPhase || "Not calculated")}</p>
      <p><strong>Notes:</strong><br/>${escapeHtml(inquiry.notes || "None")}</p>
    </div>
  `;

  if (apiKey && to) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: inquiry.email,
        subject: `GreenIQ inquiry: ${escapeHtml(inquiry.name)} — ${inquiry.recommendedPhase || "Lawn plan"}`,
        html
      })
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Inquiry received, but email delivery failed. Check Resend settings." }, { status: 502 });
    }
  } else {
    console.info("GreenIQ inquiry captured without email provider configured:", inquiry);
  }

  return NextResponse.json({ ok: true });
}
