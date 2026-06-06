import { NextResponse } from "next/server";

function sanitize(value, max = 1500) {
  return String(value || "").trim().slice(0, max);
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

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = {
    name: sanitize(payload.name, 160),
    email: sanitize(payload.email, 220),
    phone: sanitize(payload.phone, 80),
    organization: sanitize(payload.organization, 220),
    propertyType: sanitize(payload.propertyType, 180),
    inquiryType: sanitize(payload.inquiryType, 180),
    notes: sanitize(payload.notes, 1800)
  };

  if (!inquiry.name || !isEmail(inquiry.email)) {
    return NextResponse.json({ message: "Please include a valid name and email." }, { status: 422 });
  }

  const to = process.env.GREENIQ_INQUIRY_TO || process.env.GREENIQ_LEAD_TO;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "GreenIQ <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0d1b16">
      <h1 style="margin:0 0 16px;font-size:24px">New GreenIQ inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone || "Not provided")}</p>
      <p><strong>Organization:</strong> ${escapeHtml(inquiry.organization || "Not provided")}</p>
      <p><strong>Property type:</strong> ${escapeHtml(inquiry.propertyType || "Not selected")}</p>
      <p><strong>Inquiry type:</strong> ${escapeHtml(inquiry.inquiryType || "Not selected")}</p>
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
        subject: `GreenIQ inquiry: ${inquiry.name} — ${inquiry.inquiryType || "Website"}`,
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
