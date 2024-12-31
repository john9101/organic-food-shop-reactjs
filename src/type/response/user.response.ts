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

export type GotCustomerDetailResponse = {
    id: number
    full_name: string
    username: string
    email: string
    phone: string
    dob: Date
    gender_name: string
    addresses: [
        {
            specificPlace: string
            province: string
            district: string
            commune: string
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

export type EditedCustomerResponse = {
    id: number
    full_name: string
    username: string
    email: string
    phone: string
    dob: Date
    blocked: boolean
}

export type DeletedCustomerResponse = {
    id: number
}

