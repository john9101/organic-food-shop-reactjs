export type RegisteredResponse = {
    email: string
    phone: string
}

export type LoggedInResponse = {
    access_token: string
    metadata: {
        id: number,
        full_name: string
        email: string
    }
}
