import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fvyjvffppeqcfxudkenr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2eWp2ZmZwcGVxY2Z4dWRrZW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNjI2NDcsImV4cCI6MjA2MzczODY0N30.Sm0OvaxL639QCJOFNrPQo2NHz9Shpi8gNaj72Oj8nFw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);