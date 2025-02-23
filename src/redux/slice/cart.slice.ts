import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartApi from "@/api/cart.api.ts";
import {
    AddedItemToCartResponse,
    ChangedQuantityOfCartItemResponse,
    GotCartSummaryResponse, RemovedItemFromCartResponse
} from "@/type/response/cart.response.ts";
import {AddItemToCartRequest, ChangeQuantityOfItemInCartRequest} from "@/type/request/cart.request.ts";
import {isAxiosUnauthorizedError} from "@/util/axios.util.ts";
import {ErrorField, FailureApiResponse} from "@/type/response/api.type.ts";

interface IState {
    isLoading: boolean
    cart: {
        summary: GotCartSummaryResponse | null
        item: {
            added: AddedItemToCartResponse | null
        }
    };
}

const initialState: IState = {
    isLoading: true,
    cart: {
        summary: null,
        item: {
            added: null
        }
    }
}

export const getCartSummary = createAsyncThunk<GotCartSummaryResponse>(
    'cart/getCartSummary', async (_, thunkAPI) => {
        const response = await cartApi.getCartSummary(thunkAPI);
        return response.data.data;
    }
);

export const addItemToCart = createAsyncThunk<AddedItemToCartResponse, AddItemToCartRequest>(
    'cart/addItemToCart', async (body, thunkAPI) => {
        const response = await cartApi.addItemToCart(body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const changeQuantityOfItemInCart = createAsyncThunk<ChangedQuantityOfCartItemResponse, {
    body: ChangeQuantityOfItemInCartRequest,
    itemId: number
}, { rejectValue: ErrorField[] }>(
    'cart/changeQuantityOfItemInCart', async ({body, itemId}, thunkAPI) => {
        try {
            const response = await cartApi.changeQuantityOfItemInCart(body, itemId, thunkAPI);
            return thunkAPI.fulfillWithValue(response.data.data);
        } catch (error) {
            if (isAxiosUnauthorizedError<FailureApiResponse<ErrorField[]>>(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            throw error;
        }
    }
)

export const removeItemFromCart = createAsyncThunk<RemovedItemFromCartResponse, number, { rejectValue: ErrorField[] }>(
    'cart/removeItemFromCart', async (itemId, thunkAPI) => {
        try {
            const response = await cartApi.removeItemFromCart(itemId, thunkAPI)
            return thunkAPI.fulfillWithValue(response.data.data);
        } catch (error) {
            if (isAxiosUnauthorizedError<FailureApiResponse<ErrorField[]>>(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            throw error;
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetAddedCartItem: (state) => {
            state.isLoading = false
            state.cart.item.added = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartSummary.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })
        builder.addCase(getCartSummary.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.cart!.summary = action.payload
            }
        })
        builder.addCase(getCartSummary.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(addItemToCart.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            if (action.payload) {
                state.cart.summary!.total_count = action.payload.total_count
                state.cart.item.added = action.payload
                const item = state.cart.summary!.items.find(item => item.id === action.payload.item_id)
                if (item) {
                    item.quantity = action.payload.item_quantity
                }else {
                    state.cart.summary!.items.push({
                        id: action.payload.item_id,
                        quantity: action.payload.item_quantity,
                        price: action.payload.item_price,
                        subtotal: action.payload.item_price * action.payload.item_quantity,
                        product_id: action.payload.item_product_id,
                        product_title: action.payload.item_title,
                        product_thumbnail: action.payload.item_thumbnail,
                    })
                }

                // const item = state.cart.summary!.items.find(item => item.id === action.payload.item_id)
                // item!.quantity = action.payload.item_quantity
                // toast.message("Đã thêm sản phẩm vào giỏ hàng!",
                //     {
                //         className: 'w-64 border-green-600 border',
                //         position: 'bottom-center',
                //         description: React.createElement('div', {className: 'grid grid-cols-4 mt-2'},
                //             React.createElement('img', {className: 'w-12 h-12', src: action.payload.item_thumbnail}),
                //             React.createElement('div', {className: 'grid col-span-3'},
                //                 React.createElement('div', {className: 'text-sm tracking-tighter place-content-center font-semibold'}, action.payload.item_title),
                //                 React.createElement('div', {className: 'text-sm place-content-center text-green-600 font-medium'}, formatCurrency(action.payload.item_price))
                //             )
                //         ),
                //         duration: 800
                //     }
                // )
            }
        })

        builder.addCase(addItemToCart.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })
        builder.addCase(changeQuantityOfItemInCart.fulfilled, (state, action) => {
            if (action.payload) {
                // state.error = null
                const item = state.cart.summary!.items.find(item => item.id === action.payload.item_id)
                item!.quantity = action.payload.item_quantity
                const newSubtotal = item!.quantity * item!.price
                state.cart.summary!.total_price -= item!.subtotal - newSubtotal
                item!.subtotal = newSubtotal
            }
        })
        builder.addCase(changeQuantityOfItemInCart.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                // state.error = action.payload
            }
        })
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            if (action.payload) {
                // state.error = null
                const item = state.cart.summary!.items.find(item => item.id === action.payload.item_id)
                const indexOfItem = state.cart.summary!.items.indexOf(item!)
                state.cart.summary!.items.splice(indexOfItem, 1)
                state.cart.summary!.total_price -= item!.subtotal
                state.cart.summary!.total_count = state.cart.summary!.items.length
            }
        })
    }
});

export const {resetAddedCartItem} = cartSlice.actions;
export default cartSlice.reducer;