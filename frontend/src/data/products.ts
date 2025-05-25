export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string
  stock_quantity: number
  created_at?: string
  updated_at?: string
  category:string
}