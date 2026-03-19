import type { Lesson } from '@/types/schema';
import { getDexieDb } from './dexie-db';
import { SupabaseStorageClient } from './supabase-storage-client';

export async function migrateDexieLessonsToSupabase(userId: string): Promise<void> {
  const db = getDexieDb();
  const supabaseClient = new SupabaseStorageClient();

  const lessons = await db.lessons.where('user_id').equals(userId).toArray();
  if (!lessons.length) {
    return;
  }

  // Normalisation hook – currently a pass-through, but can be extended with Zod validation.
  const normalisedLessons: Lesson[] = lessons.map((lesson) => ({
    ...lesson,
  }));

  await supabaseClient.createLessons({ lessons: normalisedLessons });
}

