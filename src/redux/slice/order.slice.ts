import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PlacedOrderResponse} from "@/type/response/order.response.ts";
import {PlaceOrderRequest} from "@/type/request/order.request.ts";
import orderApi from "@/api/order.api.ts";
import {ErrorField, FailureApiResponse} from "@/type/response/api.type.ts";
import {isAxiosUnauthorizedError} from "@/util/axios.util.ts";

interface IState {
    isLoading: boolean
    order: {
        placed: PlacedOrderResponse | null
    }
    error: ErrorField[] | null;
}

const initialState: IState = {
    isLoading: true,
    order: {
        placed: null,
    },
    error: null,
}


export const placeOrder = createAsyncThunk<PlacedOrderResponse, PlaceOrderRequest, {rejectValue: ErrorField[]}>(
    'order/placeOrder', async (body, thunkAPI) => {
        try {
            const response = await orderApi.placeOrder(body, thunkAPI)
            return thunkAPI.fulfillWithValue(response.data.data);
        }catch (error) {
            if (isAxiosUnauthorizedError<FailureApiResponse<ErrorField[]>>(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            throw error;
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            if (action.payload) {
                state.error = null
                state.order.placed = action.payload
            }
        })
    }
})

export default orderSlice.reducer