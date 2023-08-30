export interface Item {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
    category_id: number;
    quantity?: number;
    totalPrice?: number;
  }
  