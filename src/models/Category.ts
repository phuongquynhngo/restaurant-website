
import { Item } from "./Item";
export interface Category {
    id: number; 
    name: string;
    image: string;
    items: Item[];
  }