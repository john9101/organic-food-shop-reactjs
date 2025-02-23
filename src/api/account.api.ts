import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    ChangedPasswordAccountResponse,
    EditedAccountInfoResponse,
    GotAccountInfoResponse,
    AddedAccountAddressResponse,
    EditedAccountAddressResponse,
    DeleteAccountAddressResponse, GotAccountAddressesResponse, GotAccountAddressDetailResponse
} from "@/type/response/account.response.ts";
import {
    AddAccountAddressRequest,
    ChangePasswordAccountRequest, EditAccountAddressRequest,
    EditAccountInfoRequest
} from "@/type/request/account.request.ts";

export const accountApi = {
    getAccountInfo: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAccountInfoResponse>>('/accounts/current/info', {
            signal: thunkAPI.signal,
        });
    },
    editAccountInfo: (body: EditAccountInfoRequest,thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedAccountInfoResponse>>('/accounts/current/info', body, {
            signal: thunkAPI.signal,
        });
    },
    changePasswordAccount: (body: ChangePasswordAccountRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<ChangedPasswordAccountResponse>>('/accounts/current/password', body, {
            signal: thunkAPI.signal
        })
    },
    getAccountAddresses: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAccountAddressesResponse>>('/accounts/current/addresses', {
            signal: thunkAPI.signal,
        });
    },
    getAccountAddressDetail: (id: number,thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAccountAddressDetailResponse>>(`/accounts/current/addresses/${id}`, {
            signal: thunkAPI.signal,
        });
    },
    addAccountAddress: (body: AddAccountAddressRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedAccountAddressResponse>>('/accounts/current/addresses', body, {
            signal: thunkAPI.signal
        })
    },
    editAccountAddress: (id: number, body: EditAccountAddressRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedAccountAddressResponse>>(`/accounts/current/addresses/${id}`, body, {
            signal: thunkAPI.signal
        })
    },
    deleteAccountAddress: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeleteAccountAddressResponse>>(`/accounts/current/addresses/${id}`, {
            signal: thunkAPI.signal
        })
    }
}