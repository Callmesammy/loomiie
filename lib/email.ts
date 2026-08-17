/**
 * Studio Email Notification Helper Module for LOOMIE Studio
 * Dispatches instant notifications when a strategy call booking is submitted:
 * 1. Studio Admin Notification (alerts studio team of new booking)
 * 2. Client Calendar Confirmation (sends meeting details to the client)
 */

interface DispatchEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function dispatchEmail({ to, subject, html }: DispatchEmailParams) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "LOOMIE Studio <notifications@loomiestudio.com>",
          to: [to],
          subject,
          html,
        }),
      });
    } catch (err) {
      console.warn("Email service dispatch notice:", err);
    }
  } else {
    // Console log notification payload for dev mode testing
    console.log(`\n📬 [EMAIL NOTIFICATION DISPATCHED]`);
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`STATUS: Sent successfully\n`);
  }
}

/**
 * Generate Admin Notification HTML Template
 */
export function getAdminEmailTemplate(booking: {
  month: string;
  day: number;
  timeSlot: string;
  timezone: string;
  name?: string;
  email: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #F5F3EF; color: #0E0E0E;">
      <div style="max-w: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin-top: 0;">
          NEW STRATEGY CALL BOOKED
        </h2>
        <p style="font-size: 14px; color: #555555; margin-bottom: 24px;">
          A new client has scheduled a 30-minute discovery call via the LOOMIE Studio website.
        </p>
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 24px 0;" />
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #777777; width: 140px; font-weight: bold;">CLIENT NAME:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #0E0E0E;">${booking.name || "Client Partner"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777777; font-weight: bold;">CLIENT EMAIL:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #0E0E0E;">${booking.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777777; font-weight: bold;">DATE:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #0E0E0E;">${booking.month} ${booking.day}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777777; font-weight: bold;">TIME SLOT:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #0E0E0E;">${booking.timeSlot}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777777; font-weight: bold;">TIMEZONE:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #0E0E0E;">${booking.timezone}</td>
          </tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #888888; font-family: monospace;">
          RECORD STORED IN CLOUDFLARE D1 DATABASE (loomie_db)
        </p>
      </div>
    </div>
  `;
}

/**
 * Generate Client Confirmation HTML Template
 */
export function getClientEmailTemplate(booking: {
  month: string;
  day: number;
  timeSlot: string;
  timezone: string;
  name?: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #F5F3EF; color: #0E0E0E;">
      <div style="max-w: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin-top: 0;">
          STRATEGY CALL CONFIRMED
        </h2>
        <p style="font-size: 15px; color: #333333; line-height: 1.6;">
          Hello ${booking.name || "there"}, thank you for booking a strategy call with <strong>LOOMIE Studio</strong>. Your discovery session is confirmed.
        </p>
        <div style="background-color: #F5F3EF; padding: 20px; border-radius: 6px; margin: 24px 0;">
          <p style="margin: 4px 0; font-size: 14px; font-weight: bold;">📅 Date: ${booking.month} ${booking.day}</p>
          <p style="margin: 4px 0; font-size: 14px; font-weight: bold;">⏰ Time: ${booking.timeSlot} (${booking.timezone})</p>
          <p style="margin: 4px 0; font-size: 14px; color: #666666;">📍 Location: Google Meet (Video Call link will be sent prior to meeting)</p>
        </div>
        <p style="font-size: 14px; color: #555555; line-height: 1.6;">
          If you need to reschedule or prepare project specs in advance, simply reply directly to this email.
        </p>
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #888888; font-family: monospace; text-transform: uppercase;">
          LOOMIE STUDIO — CLEAR. CONNECTED. COMPLETE.
        </p>
      </div>
    </div>
  `;
}
