import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    AddedItemToCartResponse,
    ChangedQuantityOfCartItemResponse,
    GotCartSummaryResponse,
    RemovedItemFromCartResponse
} from "@/type/response/cart.response.ts";
import {AddItemToCartRequest, ChangeQuantityOfItemInCartRequest} from "@/type/request/cart.request.ts";

const cartApi = {
    getCartSummary: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotCartSummaryResponse>>("carts/current/summary", {
            signal: thunkAPI.signal
        });
    },
    addItemToCart: (body: AddItemToCartRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedItemToCartResponse>>("carts/current/items", body, {
            signal: thunkAPI.signal
        })
    },
    changeQuantityOfItemInCart: (body: ChangeQuantityOfItemInCartRequest, itemId: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<ChangedQuantityOfCartItemResponse>>(`carts/current/items/${itemId}`, body, {
            signal: thunkAPI.signal
        })
    },
    removeItemFromCart: (itemId: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<RemovedItemFromCartResponse>>(`carts/current/items/${itemId}`, {
            signal: thunkAPI.signal
        })
    }
}

export default cartApi;