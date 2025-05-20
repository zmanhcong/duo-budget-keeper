
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Sử dụng URL và Key từ file client.ts đã được tạo tự động
const supabaseUrl = "https://zfsqwbcowrcufaetzsto.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmc3F3YmNvd3JjdWZhZXR6c3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NDUxNzEsImV4cCI6MjA2MzMyMTE3MX0.hHkPGAnh3KpYMSl6dKFzt92BX6fwWcu6cxQAt5RH8Mw";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];
