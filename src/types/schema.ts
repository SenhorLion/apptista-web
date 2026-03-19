export type LessonType = '1on1' | 'group';
export type LessonStatus = 'scheduled' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'unpaid' | 'exempt';
export type PaymentMethod = 'cash' | 'transfer' | 'other' | null;
export type LessonPaymentFrequency = 'per_lesson' | 'monthly';

export type RecurrenceFrequency = 'daily' | 'weekly';

export interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  interval: number;
  end_date?: string; // ISO date YYYY-MM-DD
  count?: number; // number of occurrences (alternative to end_date)
}

// ✅ Why This Format
// Mirrors Supabase column types directly (and matches postgrest-js client return shape).
// Uses string ISO timestamps (string) because that’s what Supabase returns unless you cast manually.
// Uses type unions for controlled enums.

export interface Lesson {
  id: string;
  user_id: string;
  organization_id: string;

  date: string; // ISO timestamp (timestamptz)
  duration_minutes: number;
  type: LessonType;
  status: LessonStatus;
  notes?: string;
  location_id?: string | null;

  price: number;
  payment_status: PaymentStatus;
  paid_at?: string | null; // ISO timestamp
  payment_method: PaymentMethod;
  payment_frequency?: LessonPaymentFrequency;
  monthly_amount?: number | null;

  created_at: string;
  updated_at: string;

  recurrence_group_id?: string | null;
  recurrence_rule?: RecurrenceRule | null;
}
