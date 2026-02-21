import type { Database } from './database.types';

export type Business = Database['public']['Tables']['businesses']['Row'];
export type BusinessInsert =
  Database['public']['Tables']['businesses']['Insert'];
export type BusinessUpdate =
  Database['public']['Tables']['businesses']['Update'];

export type Deal = Database['public']['Tables']['deals']['Row'];
export type DealInsert = Database['public']['Tables']['deals']['Insert'];
export type DealUpdate = Database['public']['Tables']['deals']['Update'];

export type Event = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

export type BusinessType =
  Database['public']['Tables']['business_types']['Row'];
export type BusinessTypeInsert =
  Database['public']['Tables']['business_types']['Insert'];
export type BusinessTypeUpdate =
  Database['public']['Tables']['business_types']['Update'];
