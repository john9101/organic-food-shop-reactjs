export type GotProductDetailResponse = {
    id: number
    title: string
    name: string
    short_description: string
    long_description: string
    regular_price: number
    discount_price: number
    discount_percent: number
    out_of_stock: boolean
    measurement_unit_mame: string
    measurement_value: number
    brand_name: string
    category_name: string
}

export type GotAllProductsResponse = {
    items: [
        {
            id: number
            title: string
            regular_price: number
            discount_price: number
        }
    ]
}

export type AddedProductResponse = {
    id: number
    title: string
    regular_price: number
    discount_percent: number
    discount_price: number
    brand_name: string
    category_name: string
}

export type EditedProductResponse = {
    id: number
    title: string
    regular_price: number
    discount_percent: number
    discount_price: number
    brand_name: string
    category_name: string
}

export type DeletedProductResponse = {
    id: number
}