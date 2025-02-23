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
    brand_id: number
    category_name: string
    category_id: number
    images: [
        {
            id: number
            url: string
        }
    ]
}

export type GotAllProductsResponse = {
    items: [
        {
            id: number
            title: string
            regular_price: number
            discount_percent: number
            discount_price: number
            is_visible: boolean
            is_deleted: boolean
        }
    ]
}

export type AddedProductResponse = {
    id: number
    title: string
    regular_price: number
    discount_percent: number
    discount_price: number
    is_visible: boolean
    is_deleted: boolean
}

export type EditedProductResponse = {
    id: number
    title: string
    regular_price: number
    discount_percent: number
    discount_price: number
}

export type DeletedProductResponse = {
    id: number
    is_deleted: boolean
}

export type RecoveredProductResponse = {
    id: number
    is_deleted: boolean
}

export type DisplayedProductResponse = {
    id: number
    is_visible: boolean
}

export type SearchedProductResponse = {
    items: [
        {
            id: number
            title: string
        }
    ]
}