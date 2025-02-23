import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    AddedVoucherResponse,
    DeletedVoucherResponse, DisplayedVoucherResponse, EditedVoucherResponse,
    GotAllVouchersResponse,
    GotVoucherDetailResponse, RecoveredVoucherResponse
} from "@/type/response/voucher.response.ts";
import instance from "@/util/http.ts";
import {AddVoucherRequest, EditVoucherRequest} from "@/type/request/voucher.request.ts";

const voucherApi = {
    getAllVouchers: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllVouchersResponse>>("/vouchers", {
            signal: thunkAPI.signal,
        })
    },
    getVoucherDetail: (id: number,thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotVoucherDetailResponse>>(`/vouchers/${id}`, {
            signal: thunkAPI.signal,
        })
    },
    addVoucher: (body: AddVoucherRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedVoucherResponse>>(`/vouchers`, body, {
            signal: thunkAPI.signal
        });
    },
    editVoucher: (id: number, body: EditVoucherRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedVoucherResponse>>(`/vouchers/${id}`, body, {
            signal: thunkAPI.signal
        });
    },
    deleteVoucher: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedVoucherResponse>>(`/vouchers/${id}`, {
            signal: thunkAPI.signal
        });
    },
    recoverVoucher: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<RecoveredVoucherResponse>>(`/vouchers/${id}/recovery`, {
            signal: thunkAPI.signal
        });
    },
    displayVoucher: (id: number, isVisible: boolean, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<DisplayedVoucherResponse>>(`/vouchers/${id}/visibility/${isVisible}`, {
            signal: thunkAPI.signal
        });
    }
}

export default voucherApi