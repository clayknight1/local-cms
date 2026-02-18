import { supabase } from '../lib/supabase';
import type { Business } from '../types';

export async function getBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`*`)
    .eq('tenant_id', 1)
    .eq('is_active', true)
    .eq('is_archived', false);

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    return [];
  }

  return data;
}
