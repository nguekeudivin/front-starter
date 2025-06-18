import { createResourceSlice, ResourceState } from "@/lib/resource";
import { ImageFile } from "@/types";
import { create } from "zustand";

export interface User {
  id: number;
  email: string;
  password?: string;
  email_verified_at: string;
  firstname: string;
  lastname: string;
  name: string;
 
}

export interface SetupFemaleProfileData {
  birth_date: string;
  region_id: string;
  city_id: string;
  area: string;
  occupation: string;
  about: string;
  looking: string;
  interests: number[];
  image: ImageFile;
}

interface UserState extends ResourceState<User> {

}

export const useUser = create<UserState>((set, get) => ({
  ...createResourceSlice("users", set, get),
  
}));
