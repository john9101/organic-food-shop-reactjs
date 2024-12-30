export type GotAllCustomersResponse = {
    items: [
        {
            id: number
            full_name: string
            username: string
            email: string
            phone: string
            dob: Date
            blocked: boolean
        }
    ]
}

export type AddedCustomerResponse = {
    id: number
    full_name: string
    username: string
    email: string
    phone: string
    dob: Date
    blocked: boolean
}