import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GotAllCategoriesResponse} from "@/type/response/category.response.ts";
import {brandApi} from "@/api/brand.api.ts";

interface IState {
    isLoading: boolean
    brand: {
        all: GotAllCategoriesResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    brand: {
        all: null
    }
}

export const getAllBrands = createAsyncThunk<GotAllCategoriesResponse>(
    'brand/getAllBrands', async (_,thunkAPI) => {
        const response = await brandApi.getAllBrands(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBrands.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAllBrands.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.all = action.payload
            }
        })
        builder.addCase(getAllBrands.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

    }
})

export default brandSlice.reducer;