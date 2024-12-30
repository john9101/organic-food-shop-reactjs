export type RegisteredResponse = {
    email: string
    phone: string
}

export type IntrospectedOrLoggedInResponse = {
    access_token?: string
    user_info: {
        id: number,
        full_name: string
        email: string
        avatar: string
        phone?: string
        age?: string
        gender?: string
        address?: string
        dob?: Date
    }
}
