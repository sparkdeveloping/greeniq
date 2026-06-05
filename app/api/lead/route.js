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

  const lead = {
    name: sanitize(payload.name),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    lawnSize: sanitize(payload.lawnSize),
    recommendedPhase: sanitize(payload.recommendedPhase),
    notes: sanitize(payload.notes)
  };

  if (!lead.name || !isEmail(lead.email)) {
    return NextResponse.json({ message: "Please include a valid name and email." }, { status: 422 });
  }

  const to = process.env.GREENIQ_LEAD_TO;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "GreenIQ Leads <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0b1710">
      <h1 style="margin:0 0 16px;font-size:24px">New GreenIQ lawn plan request</h1>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "Not provided")}</p>
      <p><strong>Lawn size:</strong> ${escapeHtml(lead.lawnSize || "Not provided")}</p>
      <p><strong>Recommended phase:</strong> ${escapeHtml(lead.recommendedPhase || "Not calculated")}</p>
      <p><strong>Notes:</strong><br/>${escapeHtml(lead.notes || "None")}</p>
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
        reply_to: lead.email,
        subject: `GreenIQ lead: ${escapeHtml(lead.name)} — ${lead.recommendedPhase || "Lawn plan"}`,
        html
      })
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Lead received, but email delivery failed. Check Resend settings." }, { status: 502 });
    }
  } else {
    console.info("GreenIQ lead captured without email provider configured:", lead);
  }

  return NextResponse.json({ ok: true });
}
