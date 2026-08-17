/**
 * Cloudflare D1 Database Helper Module
 * Provides seamless interface for Cloudflare D1 binding (env.DB) with local dev fallback.
 */

export interface BookingRecord {
  id: string;
  month: string;
  day: number;
  time_slot: string;
  timezone: string;
  name?: string;
  email: string;
  status: string;
  created_at: string;
}

// Memory fallback store for local Next.js dev environment
const localDevBookings: BookingRecord[] = [];

/**
 * Save booking to Cloudflare D1 database (or local dev memory fallback)
 */
export async function saveBooking(booking: {
  month: string;
  day: number;
  timeSlot: string;
  timezone: string;
  name?: string;
  email: string;
}): Promise<BookingRecord> {
  const id = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: BookingRecord = {
    id,
    month: booking.month,
    day: booking.day,
    time_slot: booking.timeSlot,
    timezone: booking.timezone,
    name: booking.name || "Anonymous Partner",
    email: booking.email,
    status: "confirmed",
    created_at: new Date().toISOString(),
  };

  // Check if running on Cloudflare Workers / Pages environment with D1 binding
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny = globalThis as any;
  const d1Binding = globalAny.env?.DB || globalAny.DB;

  if (d1Binding && typeof d1Binding.prepare === "function") {
    try {
      await d1Binding
        .prepare(
          `INSERT INTO bookings (id, month, day, time_slot, timezone, name, email, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          record.id,
          record.month,
          record.day,
          record.time_slot,
          record.timezone,
          record.name,
          record.email,
          record.status
        )
        .run();
    } catch (err) {
      console.warn("Cloudflare D1 insert warning:", err);
      localDevBookings.push(record);
    }
  } else {
    // Local dev fallback
    localDevBookings.push(record);
  }

  return record;
}

/**
 * Retrieve all bookings from Cloudflare D1
 */
export async function getBookings(): Promise<BookingRecord[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny = globalThis as any;
  const d1Binding = globalAny.env?.DB || globalAny.DB;

  if (d1Binding && typeof d1Binding.prepare === "function") {
    try {
      const { results } = await d1Binding
        .prepare(`SELECT * FROM bookings ORDER BY created_at DESC LIMIT 50`)
        .all();
      return results as BookingRecord[];
    } catch (err) {
      console.warn("Cloudflare D1 fetch error:", err);
      return localDevBookings;
    }
  }

  return localDevBookings;
}
