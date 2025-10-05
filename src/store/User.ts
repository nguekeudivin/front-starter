import { createResourceStore } from "@/lib/resource";
import { ImageFile } from "@/types";
import { create } from "zustand";

export interface User {
  id: number;
  email: string;
  password?: string;
  email_verified_at: string;
  first_name: string;
  last_name: string; 
}

export const useUser = createResourceStore<User>('users');

