import { supabase } from '../lib/supabase';
import type { Event } from '../types';

export async function getEvents(): Promise<Event[] | null> {
  const { data, error } = await supabase
    .from('events')
    .select(`*, businesses(id, name)`)
    .eq('tenant_id', 1);

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    return null;
  }

  return data;
}

export async function getEventById(id: number): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
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
