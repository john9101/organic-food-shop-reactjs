import axios, {AxiosError, HttpStatusCode} from "axios";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

export function isAxiosBadRequestError<BadRequestError>(error: unknown): error is AxiosError<BadRequestError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}