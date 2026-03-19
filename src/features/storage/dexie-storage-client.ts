import type { Lesson } from '@/types/schema';
import { getDexieDb } from './dexie-db';
import type { StorageClient } from './storage-client';

export class DexieStorageClient implements StorageClient {
  async getAllLessons(params: {
    userId: string;
    startDate?: string;
    endDate?: string;
    organizationId?: string;
  }): Promise<Lesson[]> {
    const db = getDexieDb();
    let collection = db.lessons.where('user_id').equals(params.userId);

    if (params.organizationId) {
      collection = collection.and(lesson => lesson.organization_id === params.organizationId);
    }
    if (params.startDate) {
      const from = new Date(params.startDate).toISOString();
      collection = collection.and(lesson => lesson.date >= from);
    }
    if (params.endDate) {
      const to = new Date(params.endDate).toISOString();
      collection = collection.and(lesson => lesson.date <= to);
    }

    const lessons = await collection.toArray();
    return lessons.sort((a, b) => a.date.localeCompare(b.date));
  }

  async createLessons(params: { lessons: Lesson[] }): Promise<void> {
    const db = getDexieDb();
    await db.lessons.bulkPut(params.lessons);
  }
}
