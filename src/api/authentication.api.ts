import instance from "@/util/http.ts";
import {LoginRequest, RegisterRequest} from "@/type/request/authentication.request.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {IntrospectedOrLoggedInResponse, RegisteredResponse} from "@/type/response/authentication.response.ts";

const authenticationApi = {
    register: (body: RegisterRequest) => {
        return instance.post<SuccessApiResponse<RegisteredResponse>>('/auth/register', body)
    },
    login: (body: LoginRequest) => {
        return instance.post<SuccessApiResponse<IntrospectedOrLoggedInResponse>>('/auth/login', body)
    },
    introspect: () => {
        return instance.get<SuccessApiResponse<IntrospectedOrLoggedInResponse>>('/auth/introspect');
    }
}

export default authenticationApi;

