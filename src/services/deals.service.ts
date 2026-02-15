import { supabase } from '../lib/supabase';
import type { Deal } from '../types';

export async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select(`*`)
    .eq('tenant_id', 1);

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    return [];
  }

  return data;
}
