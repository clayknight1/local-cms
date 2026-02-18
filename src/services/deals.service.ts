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

export async function getDealById(id: number): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .select(`*, businesses(id, name)`)
    .eq('tenant_id', 1)
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    return null;
  }

  return data;
}
