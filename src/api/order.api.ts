import instance from "@/util/http.ts";
import {PlaceOrderRequest} from "@/type/request/order.request.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {PlacedOrderResponse} from "@/type/response/order.response.ts";

const orderApi = {
    placeOrder: (body: PlaceOrderRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<PlacedOrderResponse>>("/orders/current", body, {
            signal: thunkAPI.signal
        });
    },
}

export default orderApi;