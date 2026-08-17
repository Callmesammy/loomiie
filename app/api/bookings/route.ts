import { NextResponse } from "next/server";
import { saveBooking, getBookings } from "@/lib/d1";
import { dispatchEmail, getAdminEmailTemplate, getClientEmailTemplate } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { month, day, timeSlot, timezone, name, email } = body;

    if (!month || !day || !timeSlot || !timezone) {
      return NextResponse.json(
        { error: "Missing required booking fields: month, day, timeSlot, timezone" },
        { status: 400 }
      );
    }

    const clientEmail = email || "client@loomiestudio.com";
    const clientName = name || "Partner Client";

    // 1. Save booking to Cloudflare D1 Database
    const booking = await saveBooking({
      month,
      day: Number(day),
      timeSlot,
      timezone,
      name: clientName,
      email: clientEmail,
    });

    const bookingPayload = {
      month: booking.month,
      day: booking.day,
      timeSlot: booking.time_slot,
      timezone: booking.timezone,
      name: booking.name,
      email: booking.email,
    };

    // 2. Dispatch notification email to Studio Admin
    const adminEmailHtml = getAdminEmailTemplate(bookingPayload);
    await dispatchEmail({
      to: process.env.STUDIO_ADMIN_EMAIL || "hello@loomiestudio.com",
      subject: `[NEW BOOKING] Strategy Call — ${month} ${day} (${timeSlot})`,
      html: adminEmailHtml,
    });

    // 3. Dispatch confirmation email to Client
    const clientEmailHtml = getClientEmailTemplate(bookingPayload);
    await dispatchEmail({
      to: clientEmail,
      subject: `Strategy Call Confirmed — LOOMIE Studio (${month} ${day})`,
      html: clientEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Strategy call booking saved to Cloudflare D1 database and email notifications dispatched",
      booking,
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Failed to save booking to database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings from database" },
      { status: 500 }
    );
  }
}
