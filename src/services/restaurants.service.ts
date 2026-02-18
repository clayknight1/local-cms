import { supabase } from '../lib/supabase';
import type { Business, BusinessInsert } from '../types';

export async function getRestaurants(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`*`)
    .eq('tenant_id', 1)
    .in('business_type', ['Restaurant', 'Cafe'])
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

export async function getBusinessById(id: number): Promise<Business | null> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`*`)
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

export async function updateBusiness(
  id: number,
  businessData: Partial<Business>,
): Promise<Business | null> {
  const { data, error } = await supabase
    .from('businesses')
    .update(businessData)
    .eq('tenant_id', 1)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }
  return data;
}

export async function addBusiness(
  business: BusinessInsert,
): Promise<Business | null> {
  const { data, error } = await supabase
    .from('businesses')
    .insert({ ...business, tenant_id: 1 })
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }
  return data;
}
