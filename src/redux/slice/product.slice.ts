import {
    AddedProductResponse, DeletedProductResponse, DisplayedProductResponse,
    EditedProductResponse,
    GotAllProductsResponse,
    GotProductDetailResponse, RecoveredProductResponse, SearchedProductResponse
} from "@/type/response/product.response.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productApi from "@/api/product.api.ts";
import {AddProductRequest, EditProductRequest} from "@/type/request/product.request.ts";

interface IState {
    isLoading: boolean
    product: {
        detail: GotProductDetailResponse | null,
        all: GotAllProductsResponse | null
        added: AddedProductResponse | null
        edited: EditedProductResponse | null
        deleted: DeletedProductResponse | null
        recovered: RecoveredProductResponse | null
        displayed: DisplayedProductResponse | null,
        searched: SearchedProductResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    product: {
        detail: null,
        all: null,
        added: null,
        edited: null,
        deleted: null,
        recovered: null,
        displayed: null,
        searched: null,
    }
}

export const getProductDetail = createAsyncThunk<GotProductDetailResponse, number>(
    'product/getProductDetail', async (id: number, thunkAPI) => {
        const response = await productApi.getProductDetail(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getAllProducts = createAsyncThunk<GotAllProductsResponse>(
    'product/getAllProducts', async (_,thunkAPI) => {
        const response = await productApi.getAllProducts(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addProduct = createAsyncThunk<AddedProductResponse, AddProductRequest>(
    'product/addProduct', async (body,thunkAPI) => {
        const response = await productApi.addProduct(body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editProduct = createAsyncThunk<EditedProductResponse, { body: EditProductRequest, productId: number }>(
    'product/editProduct', async ({body, productId},thunkAPI) => {
        const response = await productApi.editProduct(productId, body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const deleteProduct = createAsyncThunk<DeletedProductResponse, number>(
    'product/deleteProduct', async (id: number,thunkAPI) => {
        const response = await productApi.deleteProduct(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const recoverProduct = createAsyncThunk<RecoveredProductResponse, number>(
    'product/recoverProduct', async (id: number,thunkAPI) => {
        const response = await productApi.recoverProduct(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const displayProduct = createAsyncThunk<DisplayedProductResponse, {productId: number, isVisible: boolean}>(
    'product/displayProduct', async ({productId, isVisible},thunkAPI) => {
        const response = await productApi.displayProduct(productId, isVisible, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const searchProduct = createAsyncThunk<SearchedProductResponse, string>(
    'product/searchProduct', async (keyword,thunkAPI) => {
        const response = await productApi.searchProduct(keyword, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetAddedProduct: (state) => {
            state.isLoading = false
            state.product.added = null
        },
        resetEditedProduct: (state) => {
            state.isLoading = false
            state.product.edited = null
        },
        resetDeletedProduct: (state) => {
            state.isLoading = false
            state.product.deleted = null
        },
        resetRecoveredProduct: (state) => {
            state.isLoading = false
            state.product.recovered = null
        },
        resetDisplayedProduct: (state) => {
            state.isLoading = false
            state.product.displayed = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetail.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.detail = action.payload
            }
        })
        builder.addCase(getProductDetail.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(getAllProducts.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.all = action.payload
            }
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.added = action.payload
                state.product.all!.items.unshift(state.product.added)
            }
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.edited = action.payload
                const product = state.product.all!.items.find(item => item.id === action.payload.id)
                if(product != undefined){
                    product.regular_price = action.payload.regular_price
                    product.discount_price = action.payload.discount_price
                    product.discount_percent = action.payload.discount_percent
                    product.title = action.payload.title
                }
            }
        })
        builder.addCase(editProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(deleteProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.deleted = action.payload
                const product = state.product.all!.items.find(item => item.id === action.payload.id)
                if(product){
                    product.is_deleted = state.product.deleted.is_deleted
                }
            }
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(recoverProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(recoverProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.recovered = action.payload
                const product = state.product.all!.items.find(item => item.id === action.payload.id)
                if(product){
                    product.is_deleted = state.product.recovered.is_deleted
                }
            }
        })
        builder.addCase(recoverProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(displayProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(displayProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.displayed = action.payload
                const product = state.product.all!.items.find(item => item.id === action.payload.id)
                if(product){
                    product.is_visible = state.product.displayed.is_visible
                }
            }
        })
        builder.addCase(searchProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(searchProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.product.searched = action.payload
            }
        })
        builder.addCase(displayProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
})

export const {resetAddedProduct, resetEditedProduct, resetDeletedProduct, resetRecoveredProduct, resetDisplayedProduct} = productSlice.actions;
export default productSlice.reducer;