import { createResourceStore } from "@/lib/resource";
import { Item } from "./Item";


export interface User {
  id: number;
  email: string;
  password?: string;
  email_verified_at: string;
  first_name: string;
  last_name: string; 
  items: Item[];
}

export function getFullName(user: User) {
    return user.first_name + ' ' + user.last_name;
}

export const useUser = createResourceStore<User>('users');

