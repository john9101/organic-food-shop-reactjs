import instance from "@/util/http.ts";
import {LoginRequest, RegisterRequest} from "@/type/request/authentication.request.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {LoggedInResponse, RegisteredResponse} from "@/type/response/authentication.response.ts";

const authenticationApi = {
    register: (body: RegisterRequest) => {
        return instance.post<SuccessApiResponse<RegisteredResponse>>('/auth/register', body)
    },
    login: (body: LoginRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<LoggedInResponse>>('/auth/login', body, {
            signal: thunkAPI.signal
        })
    }
}

export default authenticationApi;

