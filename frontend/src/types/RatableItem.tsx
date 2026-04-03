export interface RatableItem {
  id?: number;
  item_type: string;
  external_id: string;
  title: string;
  thumbs_up_count: number;
  created_at?: string;
}
