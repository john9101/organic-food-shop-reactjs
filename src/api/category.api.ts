import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {Paging} from "@/type/response/paging.type.ts";
import {ProductItem} from "@/type/response/productItem.type.ts";
import instance from "@/util/http.ts";
import {
    AddedCategoryResponse, EditedCategoryResponse,
    GotAllCategoriesResponse,
    GotCategoryDetailResponse
} from "@/type/response/category.response.ts";
import {AddCategoryRequest, EditCategoryRequest} from "@/type/request/category.request.ts";

const categoryApi= {
    getProductsOfCategory: async (slug: string, page?: number, size?: number, sort?: string): Promise<SuccessApiResponse<Paging<ProductItem>>> => {
        const response = await instance.get(`/categories/${slug}/products`, {params: {page, size, sort}});
        return response.data;
    },
    getAllCategories: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllCategoriesResponse>>(`/categories`, {
            signal: thunkAPI.signal
        });
    },
    getCategoryDetail: (id: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotCategoryDetailResponse>>(`/categories/${id}`, {
            signal: thunkAPI.signal
        });
    },
    addCategory: (body: AddCategoryRequest,thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedCategoryResponse>>(`/categories`, body, {
            signal: thunkAPI.signal
        });
    },
    editCategory: (id: number, body: EditCategoryRequest,thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<EditedCategoryResponse>>(`/categories/${id}`, body, {
            signal: thunkAPI.signal
        });
    }
}

export default categoryApi