import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddedOrderResponse, DeletedOrderResponse, EditedOrderResponse,
    GotAllOrdersResponse,
    GotOrderDetailResponse,
    PlacedOrderResponse
} from "@/type/response/order.response.ts";
import {AddOrderRequest, EditOrderRequest, PlaceOrderRequest} from "@/type/request/order.request.ts";
import orderApi from "@/api/order.api.ts";

interface IState {
    isLoading: boolean
    order: {
        all: GotAllOrdersResponse | null
        detail: GotOrderDetailResponse | null
        placed: PlacedOrderResponse | null
        added: AddedOrderResponse | null
        deleted: DeletedOrderResponse | null
        edited: EditedOrderResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    order: {
        all: null,
        detail: null,
        placed: null,
        added: null,
        deleted: null,
        edited: null,
    }
}

export const getAllOrders = createAsyncThunk<GotAllOrdersResponse>(
    'order/getAllOrders', async (_, thunkAPI) => {
        const response = await orderApi.getAllOrders(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getOrderDetail = createAsyncThunk<GotOrderDetailResponse, string>(
    'order/getOrderDetail', async (id, thunkAPI) => {
        const response = await orderApi.getOrderDetail(id, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const placeOrder = createAsyncThunk<PlacedOrderResponse, PlaceOrderRequest>(
    'order/placeOrder', async (body, thunkAPI) => {
        const response = await orderApi.placeOrder(body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addOrder = createAsyncThunk<AddedOrderResponse, AddOrderRequest>(
    'order/addOrder', async (body,thunkAPI) => {
        const response = await orderApi.addOrder(body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editOrder = createAsyncThunk<EditedOrderResponse, {orderId: string, body: EditOrderRequest}>(
    'order/editOrder', async ({orderId, body},thunkAPI) => {
        const response = await orderApi.editOrder(orderId, body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const deleteOrder = createAsyncThunk<DeletedOrderResponse, string>(
    'order/deleteOrder', async (id: string,thunkAPI) => {
        const response = await orderApi.deleteOrder(id, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetAddedOrder: (state) => {
            state.isLoading = false
            state.order.added = null
        },
        resetEditedOrder: (state) => {
            state.isLoading = false
            state.order.edited = null
        },
        resetDeletedOrder: (state) => {
            state.isLoading = false
            state.order.deleted = null
        },
        resetPlacedOrder: (state) => {
            state.isLoading = false
            state.order.placed = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.order.all = action.payload
            }
        })

        builder.addCase(getAllOrders.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(getOrderDetail.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(getOrderDetail.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.order.detail = action.payload
            }
        })

        builder.addCase(getOrderDetail.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(placeOrder.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(placeOrder.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.order.placed = action.payload
            }
        })

        builder.addCase(placeOrder.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(addOrder.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(addOrder.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.order.added = action.payload
            }
        })

        builder.addCase(addOrder.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })


        builder.addCase(editOrder.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(editOrder.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.order.edited = action.payload
            }
        })

        builder.addCase(editOrder.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(deleteOrder.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.order.deleted = action.payload
            }
        })

        builder.addCase(deleteOrder.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })
    }
})

export const {resetAddedOrder, resetDeletedOrder, resetPlacedOrder, resetEditedOrder} = orderSlice.actions;
export default orderSlice.reducer