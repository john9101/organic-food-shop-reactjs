export type SuccessApiResponse<Data> = {
    timestamp: string
    status: number
    message: string
    data: Data
}

export type ErrorField = {
    field: string
    detail: string
}

export type FailureApiResponse<Error> = {
    timestamp: string
    status: number
    message: string
    error: Error
    type: string
    path: string
}