import { supabase } from '../lib/supabase';
import type { Deal, DealInsert, DealUpdate } from '../types';

export type DealWithBusiness = Deal & {
  businesses: {
    id: number;
    name: string;
  } | null;
};

export async function getDeals(): Promise<DealWithBusiness[]> {
  const { data, error } = await supabase
    .from('deals')
    .select(
      `
      *,
      businesses (
        id,
        name
      )
    `,
    )
    .order('expires_at', { ascending: false });
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

export async function addDeal(deal: DealInsert): Promise<Deal> {
  const { data, error } = await supabase
    .from('deals')
    .insert({ ...deal, tenant_id: 1 })
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }
  return data;
}

export async function updateDeal(
  id: number,
  dealData: DealUpdate,
): Promise<Deal> {
  const { data, error } = await supabase
    .from('deals')
    .update(dealData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }
  return data;
}
