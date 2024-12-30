export type GotCartSummaryResponse = {
    id: number,
    total_count: number,
    total_price: number,
    items: [
        {
            id: number,
            quantity: number,
            price: number,
            subtotal: number,
            product_id: number,
            product_title: string,
            product_slug: string,
            product_thumbnail: string,
        }
    ]
}

export type AddedItemToCartResponse = {
    total_count: number,
    item_id: number,
    item_title: string,
    item_quantity: number,
    item_price: number,
    item_thumbnail: string
}

export type ChangedQuantityOfCartItemResponse = {
    item_id: number,
    item_quantity: number,
}

export type RemovedItemFromCartResponse = {
    item_id: number,
    total_count: number,
}