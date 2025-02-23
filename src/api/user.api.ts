import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    AddedCustomerResponse, AddedEmployeeResponse,
    DeletedCustomerResponse, DeletedEmployeeResponse, EditedCustomerResponse, EditedEmployeeResponse,
    GotAllCustomersResponse, GotAllEmployeesResponse, GotCustomerDetailResponse, GotEmployeeDetailResponse
} from "@/type/response/user.response.ts";
import {
    AddCustomerRequest,
    AddEmployeeRequest,
    EditCustomerRequest,
    EditEmployeeRequest
} from "@/type/request/user.request.ts";

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
        return instance.patch<SuccessApiResponse<EditedCustomerResponse>>(`/users/customers/${id}`, body, {
            signal: thunkAPI.signal
        });
    },
    deleteCustomer: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedCustomerResponse>>(`/users/customers/${id}`, {
            signal: thunkAPI.signal
        });
    },

    getAllEmployees: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllEmployeesResponse>>("/users/employees", {
            signal: thunkAPI.signal
        });
    },
    getEmployeeDetail: (id: number ,thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotEmployeeDetailResponse>>(`/users/employees/${id}`, {
            signal: thunkAPI.signal
        });
    },
    addEmployee: (body: AddEmployeeRequest , thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedEmployeeResponse>>("/users/employees", body, {
            signal: thunkAPI.signal
        });
    },
    editEmployee: (id: number, body: EditEmployeeRequest , thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedEmployeeResponse>>(`/users/employees/${id}`, body, {
            signal: thunkAPI.signal
        });
    },
    deleteEmployee: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedEmployeeResponse>>(`/users/employees/${id}`, {
            signal: thunkAPI.signal
        });
    },
}

export default userApi;