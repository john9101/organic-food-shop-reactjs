export type ProductItem = {
    id: number;
    slug: string;
    name: string;
    rating: number;
    short_description: string;
    image_urls: string[];
    out_of_stock: boolean;
    price_use_for_sort: number;
    discount_percent_event: null | number
}