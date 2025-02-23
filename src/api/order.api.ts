import instance from "@/util/http.ts";
import {AddOrderRequest, EditOrderRequest, PlaceOrderRequest} from "@/type/request/order.request.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {
    AddedOrderResponse, DeletedOrderResponse, EditedOrderResponse,
    GotAllOrdersResponse,
    GotOrderDetailResponse,
    PlacedOrderResponse
} from "@/type/response/order.response.ts";

const orderApi = {
    placeOrder: (body: PlaceOrderRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<PlacedOrderResponse>>("/orders/current", body, {
            signal: thunkAPI.signal
        });
    },
    getAllOrders: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllOrdersResponse>>("/orders", {
            signal: thunkAPI.signal
        });
    },
    getOrderDetail: (id: string, thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotOrderDetailResponse>>(`/orders/${id}`, {
            signal: thunkAPI.signal
        });
    },
    addOrder: (body: AddOrderRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedOrderResponse>>("/orders", body, {
            signal: thunkAPI.signal
        });
    },
    editOrder: (id: string,body: EditOrderRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<EditedOrderResponse>>(`/orders/${id}`, body, {
            signal: thunkAPI.signal
        });
    },
    deleteOrder: (id: string, thunkAPI: {signal :AbortSignal}) => {
        return instance.delete<SuccessApiResponse<DeletedOrderResponse>>(`/orders/${id}`, {
            signal: thunkAPI.signal
        });
    }
}

export default orderApi;