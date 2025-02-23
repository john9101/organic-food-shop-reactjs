import {SuccessApiResponse} from "@/type/response/api.type.ts";
import instance from "@/util/http.ts";
import {
    AddedProductResponse, DeletedProductResponse, DisplayedProductResponse, EditedProductResponse,
    GotAllProductsResponse,
    GotProductDetailResponse, RecoveredProductResponse, SearchedProductResponse
} from "@/type/response/product.response.ts";
import {AddProductRequest, EditProductRequest} from "@/type/request/product.request.ts";

const getFormData = (body: AddProductRequest | EditProductRequest): FormData => {
    const formData = new FormData();

    formData.append("name", body.name)
    if (body.shortDescription != undefined) {
        formData.append("shortDescription", body.shortDescription)
    }

    if (body.longDescription != undefined){
        formData.append("longDescription", body.longDescription!)
    }

    formData.append("measurementValue", body.measurementValue.toString())
    formData.append("measurementUnit", body.measurementUnit)
    formData.append("regularPrice", body.regularPrice.toString())

    if (body.discountPercent){
        formData.append("discountPercent", body.discountPercent.toString())
    }

    if (body.brandId != undefined) {
        formData.append("brandId", body.brandId.toString())
    }

    if (body.categoryId != undefined){
        formData.append("categoryId", body.categoryId.toString())
    }

    body.images.forEach((image) => {
        formData.append(`images`, image);
    });
    return formData;
}

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
        // const formData = new FormData();
        //
        // formData.append("name", body.name)
        // if (body.shortDescription != undefined) {
        //     formData.append("shortDescription", body.shortDescription)
        // }
        //
        // if (body.longDescription != undefined){
        //     formData.append("longDescription", body.longDescription!)
        // }
        //
        // formData.append("measurementValue", body.measurementValue.toString())
        // formData.append("measurementUnit", body.measurementUnit)
        // formData.append("regularPrice", body.regularPrice.toString())
        //
        // if (body.discountPercent){
        //     formData.append("discountPercent", body.discountPercent.toString())
        // }
        //
        // if (body.brandId != undefined) {
        //     formData.append("brandId", body.brandId.toString())
        // }
        //
        // if (body.categoryId != undefined){
        //     formData.append("categoryId", body.categoryId.toString())
        // }
        //
        // body.images.forEach((image) => {
        //     formData.append(`images`, image);
        // });

        return instance.post<SuccessApiResponse<AddedProductResponse>>(`/products`, getFormData(body), {
            headers: { "Content-Type": "multipart/form-data" },
            signal: thunkAPI.signal
        });
    },
    editProduct: (id: number, body: EditProductRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedProductResponse>>(`/products/${id}`, getFormData(body), {
            headers: { "Content-Type": "multipart/form-data" },
            signal: thunkAPI.signal
        });
    },
    deleteProduct: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedProductResponse>>(`/products/${id}`, {
            signal: thunkAPI.signal
        });
    },
    recoverProduct: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<RecoveredProductResponse>>(`/products/${id}/recovery`, {
            signal: thunkAPI.signal
        });
    },
    displayProduct: (id: number, isVisible: boolean, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<DisplayedProductResponse>>(`/products/${id}/visibility/${isVisible}`, {
            signal: thunkAPI.signal
        });
    },
    searchProduct: (keyword: string,  thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<SearchedProductResponse>>(`/products/searches`, {
            params: {keyword: keyword,},
            signal: thunkAPI.signal
        });
    }
}

export default productApi