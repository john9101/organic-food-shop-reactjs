import {SuccessApiResponse} from "@/type/response/api.type.ts";
import instance from "@/util/http.ts";
import {
    AddedProductResponse,
    GotAllProductsResponse,
    GotProductDetailResponse
} from "@/type/response/product.response.ts";
import {AddProductRequest} from "@/type/request/product.request.ts";

const productApi = {
    getProductDetail: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotProductDetailResponse>>(`/products/${id}`, {
            signal: thunkAPI.signal
        });
    },
    getAllProducts: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllProductsResponse>>(`/products`, {
            signal: thunkAPI.signal
        });
    },
    addProduct: (body: AddProductRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedProductResponse>>(`/products`, body, {
            headers: { "Content-Type": "multipart/form-data" },
            signal: thunkAPI.signal
        });
    },
    editProduct: (id: number, body: AddProductRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<AddedProductResponse>>(`/products/${id}`, body, {
            headers: { "Content-Type": "multipart/form-data" },
            signal: thunkAPI.signal
        });
    }
}

export default productApi