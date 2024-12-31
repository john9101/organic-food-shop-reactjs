import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    AddedCustomerResponse,
    DeletedCustomerResponse,
    GotAllCustomersResponse, GotCustomerDetailResponse
} from "@/type/response/user.response.ts";
import {AddCustomerRequest, EditCustomerRequest} from "@/type/request/user.request.ts";

const userApi = {
    getAllCustomers: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllCustomersResponse>>("/users/customers", {
            signal: thunkAPI.signal
        });
    },
    getCustomerDetail: (id: number ,thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotCustomerDetailResponse>>(`/users/customers/${id}`, {
            signal: thunkAPI.signal
        });
    },
    addCustomer: (body: AddCustomerRequest , thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedCustomerResponse>>("/users/customers", body, {
            signal: thunkAPI.signal
        });
    },
    editCustomer: (id: number, body: EditCustomerRequest , thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<AddedCustomerResponse>>(`/users/customers/${id}`, body, {
            signal: thunkAPI.signal
        });
    },
    deleteCustomer: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedCustomerResponse>>(`/users/customers/${id}`, {
            signal: thunkAPI.signal
        });
    }
}

export default userApi;