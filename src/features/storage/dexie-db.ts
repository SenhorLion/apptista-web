import Dexie, { Table } from 'dexie';
import type { Lesson } from '@/types/schema';

export class LessonTrackerDexie extends Dexie {
  lessons!: Table<Lesson, string>;

  constructor() {
    super('lesson-tracker');

    this.version(1).stores({
      lessons:
        '&id, user_id, organization_id, date, status, payment_status, payment_frequency',
    });
  }
}

let dbInstance: LessonTrackerDexie | null = null;

export function getDexieDb(): LessonTrackerDexie {
  if (!dbInstance) {
    dbInstance = new LessonTrackerDexie();
  }
  return dbInstance;
}

