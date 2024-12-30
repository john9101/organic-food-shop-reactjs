export type AddItemToCartRequest = {
    productId: number;
    quantity: number;
}

export type ChangeQuantityOfItemInCartRequest = {
    quantity: number
}