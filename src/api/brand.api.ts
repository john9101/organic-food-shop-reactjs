import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    AddedBrandResponse, DeletedBrandResponse, DisplayedBrandResponse,
    EditedBrandResponse,
    GotAllBrandsResponse,
    GotBrandDetailResponse, RecoveredBrandResponse
} from "@/type/response/brand.response.ts";
import {AddBrandRequest, EditBrandRequest} from "@/type/request/brand.request.ts";

export const brandApi = {
    getAllBrands: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllBrandsResponse>>(`/brands`, {
            signal: thunkAPI.signal
        });
    },
    getBrandDetail: (id: number,thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotBrandDetailResponse>>(`/brands/${id}`, {
            signal: thunkAPI.signal
        });
    },
    addBrand: (body: AddBrandRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedBrandResponse>>("/brands", body, {
            signal: thunkAPI.signal
        });
    },
    editBrand: (id: number, body: EditBrandRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedBrandResponse>>(`/brands/${id}`, body, {
            signal: thunkAPI.signal
        });
    },
    deleteBrand: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedBrandResponse>>(`/brands/${id}`, {
            signal: thunkAPI.signal
        });
    },
    recoverBrand: (id: number,thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<RecoveredBrandResponse>>(`/brands/${id}/recovery`, {
            signal: thunkAPI.signal
        });
    },
    displayBrand: (id: number, isVisible: boolean,thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<DisplayedBrandResponse>>(`/brands/${id}/visibility/${isVisible}`, {
            signal: thunkAPI.signal
        });
    }
}