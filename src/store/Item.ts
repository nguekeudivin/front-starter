import { createResourceStore } from "@/lib/resource";
import { Asset } from "./Asset";
import { Category } from "./Category";
import { User } from "./User";

export interface Item {
    id: number;
    name: string;
    description: string;
    category_id: string;
    user_id: number;
    category: Category;
    asset: Asset;
    user: User;
    date: string | Date;
    status: 'active' | 'inactive',
    created_at: string | Date;
    updated_at: string | Date;
}

export const useItem = createResourceStore<Item>('items');