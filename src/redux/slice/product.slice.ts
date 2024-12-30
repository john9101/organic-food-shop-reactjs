import {
    AddedProductResponse,
    EditedProductResponse,
    GotAllProductsResponse,
    GotProductDetailResponse
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
    }
}

const initialState: IState = {
    isLoading: true,
    product: {
        detail: null,
        all: null,
        added: null,
        edited: null,
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
            }
        })
        builder.addCase(editProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
})

export const {resetAddedProduct, resetEditedProduct} = productSlice.actions;
export default productSlice.reducer;