
// This is a minimal type definition that will be expanded after you connect to Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      expenses: {
        Row: {
          id: string
          amount: number
          category: string | null
          note: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          amount: number
          category?: string | null
          note?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          amount?: number
          category?: string | null
          note?: string | null
          created_at?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          family_id: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          family_id: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          family_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
