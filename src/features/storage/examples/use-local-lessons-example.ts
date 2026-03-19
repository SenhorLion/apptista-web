import { useEffect, useMemo, useState } from 'react';
import type { Lesson } from '@/types/schema';
import { DexieStorageClient } from '../dexie-storage-client';

/**
 * Tiny example hook: stores and reads lessons locally via Dexie.
 */
export function useLocalLessonsExample(userId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const client = useMemo(() => new DexieStorageClient(), []);

  useEffect(() => {
    async function run() {
      // Seed a single lesson if none exist.
      const existing = await client.getAllLessons({ userId });
      if (existing.length === 0) {
        const now = new Date();
        const lesson: Lesson = {
          id: `local-${now.getTime()}`,
          user_id: userId,
          organization_id: 'local-org',
          date: now.toISOString(),
          duration_minutes: 60,
          type: '1on1',
          status: 'scheduled',
          notes: 'Local-only example lesson',
          location_id: null,
          price: 0,
          payment_status: 'unpaid',
          paid_at: null,
          payment_method: null,
          payment_frequency: 'per_lesson',
          monthly_amount: null,
          created_at: now.toISOString(),
          updated_at: now.toISOString(),
          recurrence_group_id: null,
          recurrence_rule: null,
        };
        await client.createLessons({ lessons: [lesson] });
      }

      const all = await client.getAllLessons({ userId });
      setLessons(all);
    }

    run();
  }, [client, userId]);

  return lessons;
}
