import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {AddedCustomerResponse, GotAllCustomersResponse} from "@/type/response/user.response.ts";
import {AddCustomerRequest} from "@/type/request/user.request.ts";

const userApi = {
    getAllCustomers: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllCustomersResponse>>("/users/customers", {
            signal: thunkAPI.signal
        });
    },
    addCustomer: (body: AddCustomerRequest , thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedCustomerResponse>>("/users/customers", body, {
            signal: thunkAPI.signal
        });
    },
    editCustomer: (body: AddCustomerRequest , thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<AddedCustomerResponse>>("/users/customers", body, {
            signal: thunkAPI.signal
        });
    },
}

export default userApi;