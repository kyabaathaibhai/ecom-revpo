import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or service key');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 