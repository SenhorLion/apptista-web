import type { Lesson } from '@/types/schema';

export interface StorageClient {
  // Lessons
  getAllLessons(params: {
    userId: string;
    startDate?: string;
    endDate?: string;
    organizationId?: string;
  }): Promise<Lesson[]>;

  createLessons(params: { lessons: Lesson[] }): Promise<void>;

  // TODO: Add organisations, locations, membership, etc. as they are migrated.
}

export type StorageClientFactory = () => StorageClient;

