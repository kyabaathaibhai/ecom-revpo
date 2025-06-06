export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          stock_quantity: number
          created_at: string
          updated_at: string
          category:string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: Database['public']['Enums']['order_status']
          total_amount: number
          shipping_address: Json
          customer_details: Json
          coupon_code: string | null
          coupon_discount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: Database['public']['Enums']['order_status']
          total_amount: number
          shipping_address: Json
          customer_details: Json
          coupon_code?: string | null
          coupon_discount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: Database['public']['Enums']['order_status']
          total_amount?: number
          shipping_address?: Json
          customer_details?: Json
          coupon_code?: string | null
          coupon_discount?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          product_name: string
          product_image_url: string | null
          product_description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          product_name: string
          product_image_url?: string | null
          product_description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          product_name?: string
          product_image_url?: string | null
          product_description?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          address: Json | null
          avatar_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          address?: Json | null
          avatar_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          address?: Json | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      coupons: {
        Row: {
          code: string
          discount_percentage: number
          valid_from: string
          valid_until: string | null
          max_uses: number | null
          times_used: number
          created_at: string
        }
        Insert: {
          code: string
          discount_percentage: number
          valid_from?: string
          valid_until?: string | null
          max_uses?: number | null
          times_used?: number
          created_at?: string
        }
        Update: {
          code?: string
          discount_percentage?: number
          valid_from?: string
          valid_until?: string | null
          max_uses?: number | null
          times_used?: number
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
      order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
      discount_type: 'percentage' | 'fixed'
    }
  }
} 