import { useMemo } from 'react';
import { DexieStorageClient } from './dexie-storage-client';
import type { StorageClient } from './storage-client';
import { SupabaseStorageClient } from './supabase-storage-client';

type Plan = 'free' | 'paid';

export function getServerStorageClient(plan: Plan): StorageClient {
  if (plan === 'paid') {
    return new SupabaseStorageClient();
  }
  return new DexieStorageClient();
}

export function useStorageClient(plan: Plan): StorageClient {
  return useMemo(() => getServerStorageClient(plan), [plan]);
}
