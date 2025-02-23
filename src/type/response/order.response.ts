export type PlacedOrderResponse = {
    id: string;
    payment_method: string;
    payment_url: string;
}

export type GotAllOrdersResponse = {
    items: [
        {
            id: string;
            total_price: number;
            payment_method: string
            order_status: string;
            transaction_status: string;
            created_at: Date;
            customer_id: number;
            recipient_full_name: string;
            recipient_phone: string;
        }
    ]
}

export type GotOrderDetailResponse = {
    id: string;
    total_price: number;
    payment_method: string
    order_status: string;
    transaction_status: string;
    created_at: Date;
    customer_id: number;
    customer_full_name: string;
    recipient_full_name: string;
    recipient_email: string;
    recipient_phone: string;
    recipient_specific_place: string;
    province: string;
    district: string;
    commune: string;
    note: string;
    voucher_id: number;
    voucher_title: string;
    items: [
        {
            id: string;
            quantity: number;
            product_title: string;
            product_id: number;
            price: number;
        }
    ]
}

export type AddedOrderResponse =  {
    id: string;
    total_price: number;
    payment_method: string
    order_status: string;
    transaction_status: string;
    created_at: Date;
    customer_id: number;
    recipient_full_name: string;
    recipient_phone: string;
    payment_url: string
}

export type EditedOrderResponse =  {
    id: string;
    total_price: number;
    payment_method: string
    order_status: string;
    transaction_status: string;
    created_at: Date;
    customer_id: number;
    recipient_full_name: string;
    recipient_phone: string;
}

export type DeletedOrderResponse =  {
    id: string;
}