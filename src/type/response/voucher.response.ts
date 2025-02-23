export type GotAllVouchersResponse = {
    items: [
        {
            id: number,
            code: string,
            discount_percent: number,
            quantity: number,
            effective_date: Date,
            expiry_date: Date,
            is_visible: boolean,
            is_deleted: boolean,
        }
    ]
}

export type GotVoucherDetailResponse = {
    id: number,
    code: string,
    description: string,
    discount_percent: number,
    minimum_amount: number,
    quantity: number,
    effective_date: Date,
    expiry_date: Date,
}

export type AddedVoucherResponse = {
    id: number,
    code: string,
    discount_percent: number,
    quantity: number,
    effective_date: Date,
    expiry_date: Date,
    is_visible: boolean,
    is_deleted: boolean
}

export type EditedVoucherResponse = {
    id: number
    code: string,
    discount_percent: number,
    quantity: number,
    effective_date: Date,
    expiry_date: Date,
}

export type DeletedVoucherResponse = {
    id: number
    is_deleted: boolean
}

export type RecoveredVoucherResponse = {
    id: number
    is_deleted: boolean
}

export type DisplayedVoucherResponse = {
    id: number
    is_visible: boolean
}