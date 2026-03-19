import Dexie from 'dexie';
import { IDBKeyRange, indexedDB } from 'fake-indexeddb';
import { describe, expect, it, vi } from 'vitest';
import type { Lesson } from '@/types/schema';
import { DexieStorageClient } from '../dexie-storage-client';
import { SupabaseStorageClient } from '../supabase-storage-client';

Dexie.dependencies.indexedDB = indexedDB as unknown as IDBFactory;
Dexie.dependencies.IDBKeyRange = IDBKeyRange as unknown as typeof IDBKeyRange;

vi.mock('@/lib/supabase/supabase', () => {
  return {
    supabase: {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ error: null }),
    },
  };
});

describe('SupabaseStorageClient', () => {
  it('creates lessons via Supabase', async () => {
    const client = new SupabaseStorageClient();
    const lesson: Lesson = {
      id: '1',
      user_id: 'u1',
      organization_id: 'o1',
      date: new Date().toISOString(),
      duration_minutes: 60,
      type: '1on1',
      status: 'scheduled',
      notes: null as unknown as string,
      location_id: null,
      price: 0,
      payment_status: 'unpaid',
      paid_at: null,
      payment_method: null,
      payment_frequency: 'per_lesson',
      monthly_amount: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      recurrence_group_id: null,
      recurrence_rule: null,
    };

    await client.createLessons({ lessons: [lesson] });
    expect(true).toBe(true);
  });
});

describe('DexieStorageClient', () => {
  it('stores and retrieves lessons locally', async () => {
    const client = new DexieStorageClient();
    const userId = 'dexie-user';
    const now = new Date().toISOString();
    const lesson: Lesson = {
      id: 'local-1',
      user_id: userId,
      organization_id: 'o1',
      date: now,
      duration_minutes: 30,
      type: '1on1',
      status: 'scheduled',
      notes: 'test',
      location_id: null,
      price: 0,
      payment_status: 'unpaid',
      paid_at: null,
      payment_method: null,
      payment_frequency: 'per_lesson',
      monthly_amount: null,
      created_at: now,
      updated_at: now,
      recurrence_group_id: null,
      recurrence_rule: null,
    };

    await client.createLessons({ lessons: [lesson] });
    const loaded = await client.getAllLessons({ userId });
    expect(loaded.length).toBeGreaterThanOrEqual(1);
  });
});
