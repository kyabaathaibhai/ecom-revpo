export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          stock_quantity: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 