import { createResourceStore } from "@/lib/resource";
import { Asset } from "./Asset";


export interface Item {
    id: number | string;
    uuid: string;
    name: string;
    description: string;
    code: string;
    optional_note: string | null;
    small_count: number;
    integer_value: number;
    high_precision_value: string;
    standard_float: number;
    is_active: boolean;
    timestamp_with_timezone: Date | string;
    just_the_date: Date | string;
    just_the_time: string;
    tags: string[];
    settings_json: Record<string, any>;
    binary_data_reference: string;
    status: 'draft' | 'published' | 'archived' | 'deleted';
    
    version: number;
    deleted_at: Date | string | null;
    created_at: Date | string;
    updated_at: Date | string;
    
    created_by_user_id: number;
    related_entity_id: number;
    related: any;

    image: Asset | null;
    assets: Asset[];
}

export const useItem = createResourceStore<Item>('items');