import { OrderItem } from "./OrderItem";

export interface Order {
    id?: number;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    products: OrderItem[],
  }
  