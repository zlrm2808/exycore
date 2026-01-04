import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const setTenantSchema = (schemaName: string) => {
  return supabase.rpc('set_config', {
    setting: 'search_path',
    value: `${schemaName}, public`,
    is_local: false
  });
};