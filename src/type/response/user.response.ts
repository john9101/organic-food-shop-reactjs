export type GotAllCustomersResponse = {
    items: [
        {
            id: number
            full_name: string
            username: string
            email: string
            phone: string
            dob: Date
            is_blocked: boolean
            is_activated: boolean
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


export type GotAllEmployeesResponse = {
    items: [
        {
            id: number
            full_name: string
            username: string
            email: string
            phone: string
            dob: Date
            salary: number
            hire_date: Date
            employment_status: string
            is_blocked: boolean
            is_activated: boolean
        }
    ]
}

export type GotEmployeeDetailResponse = {
    id: number
    full_name: string
    username: string
    email: string
    phone: string
    dob: Date
    salary: number
    hire_date: Date
    employment_status: string
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

export type AddedEmployeeResponse = {
    id: number
    full_name: string
    username: string
    email: string
    phone: string
    dob: Date
    blocked: boolean
    salary: number
    hire_date: Date
    employment_status: string
}

export type EditedEmployeeResponse = {
    id: number
    full_name: string
    username: string
    email: string
    phone: string
    dob: Date
    blocked: boolean
    salary: number
    hire_date: Date
    employment_status: string
}

export type DeletedEmployeeResponse = {
    id: number
}
