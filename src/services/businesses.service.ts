import { supabase } from '../lib/supabase';
import type { Business, BusinessType } from '../types';

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

export async function getBusinessTypes(): Promise<BusinessType[]> {
  const { data, error } = await supabase
    .from('business_types')
    .select(`*`)
    .order('name', { ascending: true });

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    return [];
  }

  return data;
}
