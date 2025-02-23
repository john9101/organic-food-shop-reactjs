export type GotAccountInfoResponse = {
    id?: number,
    username?: string,
    full_name: string
    email: string
    phone: string
    gender: string
    dob: Date
}

export type EditedAccountInfoResponse = {
    id: number,
    full_name: string
    email: string
    phone: string
    gender: string
    dob: Date
}

export type ChangedPasswordAccountResponse = {
    id: number
}

export type GotAccountAddressesResponse = {
    items: [
        {
            id: number,
            specific_place: string,
            province: string,
            district: string,
            commune: string,
        }
    ]
}

export type GotAccountAddressDetailResponse = {
    id: number,
    specific_place: string,
    province: string,
    district: string,
    commune: string,
}

export type AddedAccountAddressResponse = {
    id: number,
    specific_place: string,
    province: string,
    district: string,
    commune: string,
}

export type EditedAccountAddressResponse = {
    id: number,
    specific_place: string,
    province: string,
    district: string,
    commune: string,
}

export type DeleteAccountAddressResponse = {
    id: number
}