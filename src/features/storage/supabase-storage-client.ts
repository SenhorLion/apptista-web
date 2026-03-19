import { supabase } from '@/lib/supabase/supabase';
import type { Lesson } from '@/types/schema';
import type { StorageClient } from './storage-client';

export class SupabaseStorageClient implements StorageClient {
  async getAllLessons(params: {
    userId: string;
    startDate?: string;
    endDate?: string;
    organizationId?: string;
  }): Promise<Lesson[]> {
    let query = supabase
      .from('lesson')
      .select('*')
      .eq('user_id', params.userId)
      .order('date', { ascending: true });

    if (params.organizationId) {
      query = query.eq('organization_id', params.organizationId);
    }
    if (params.startDate) {
      query = query.gte('date', params.startDate);
    }
    if (params.endDate) {
      query = query.lte('date', params.endDate);
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }
    return data as Lesson[];
  }

  async createLessons(params: { lessons: Lesson[] }): Promise<void> {
    if (!params.lessons.length) return;
    const { error } = await supabase.from('lesson').insert(params.lessons);
    if (error) {
      throw error;
    }
  }
}
