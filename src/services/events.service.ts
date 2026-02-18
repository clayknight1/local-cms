import { supabase } from '../lib/supabase';
import type { Event } from '../types';

export async function getEvents(): Promise<Event[] | null> {
  console.time('getEvents API call');
  const { data, error } = await supabase
    .from('events')
    .select(`*, businesses(id, name)`)
    .eq('tenant_id', 1);
  console.timeEnd('getEvents API call');

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    return null;
  }

  return data;
}
export type EventWithBusiness = Event & {
  businesses: {
    id: number;
    name: string;
  } | null;
};

export async function getEventById(
  id: number,
): Promise<EventWithBusiness | null> {
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
