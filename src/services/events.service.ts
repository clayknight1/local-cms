import { supabase } from '../lib/supabase';
import type { Event, EventInsert, EventUpdate } from '../types';

export async function getEvents(): Promise<EventWithBusiness[] | null> {
  const { data, error } = await supabase
    .from('events')
    .select(`*, businesses(id, name)`)
    .eq('tenant_id', 1)
    .order('date', { ascending: true });

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

export async function addEvent(event: EventInsert): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert({ ...event, tenant_id: 1 })
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }
  return data;
}

export async function updateEvent(
  id: number,
  event: EventUpdate,
): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }
  return data;
}
