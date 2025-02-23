import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {brandApi} from "@/api/brand.api.ts";
import {
    AddedBrandResponse, DeletedBrandResponse, DisplayedBrandResponse,
    EditedBrandResponse,
    GotAllBrandsResponse,
    GotBrandDetailResponse, RecoveredBrandResponse
} from "@/type/response/brand.response.ts";
import {AddBrandRequest, EditBrandRequest} from "@/type/request/brand.request.ts";

interface IState {
    isLoading: boolean
    brand: {
        all: GotAllBrandsResponse | null,
        detail: GotBrandDetailResponse | null,
        added: AddedBrandResponse | null,
        edited: EditedBrandResponse | null,
        deleted: DeletedBrandResponse | null,
        recovered: RecoveredBrandResponse | null,
        displayed: DisplayedBrandResponse | null,
    }
}

const initialState: IState = {
    isLoading: true,
    brand: {
        all: null,
        detail: null,
        added: null,
        edited: null,
        deleted: null,
        recovered: null,
        displayed: null
    }
}

export const getAllBrands = createAsyncThunk<GotAllBrandsResponse>(
    'brand/getAllBrands', async (_,thunkAPI) => {
        const response = await brandApi.getAllBrands(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getBrandDetail = createAsyncThunk<GotBrandDetailResponse, number>(
    'brand/getBrandDetail', async (id,thunkAPI) => {
        const response = await brandApi.getBrandDetail(id,thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addBrand = createAsyncThunk<AddedBrandResponse, AddBrandRequest>(
    'brand/addBrand', async (body, thunkAPI) => {
        const response = await brandApi.addBrand(body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
)

export const editBrand = createAsyncThunk<EditedBrandResponse, {brandId: number, body: EditBrandRequest}>(
    'brand/editBrand', async ({brandId, body}, thunkAPI) => {
        const response = await brandApi.editBrand(brandId, body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
)

export const deleteBrand = createAsyncThunk<DeletedBrandResponse, number>(
    'brand/deleteBrand', async (id, thunkAPI) => {
        const response = await brandApi.deleteBrand(id, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
)

export const recoverBrand = createAsyncThunk<DeletedBrandResponse, number>(
    'brand/recoverBrand', async (id: number, thunkAPI) => {
        const response = await brandApi.recoverBrand(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const displayBrand = createAsyncThunk<DisplayedBrandResponse, {brandId: number, isVisible: boolean}>(
    'brand/displayBrand', async ({brandId, isVisible}, thunkAPI) => {
        const response = await brandApi.displayBrand(brandId, isVisible, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        resetAddedBrand: (state) => {
            state.isLoading = false
            state.brand.added = null
        },
        resetEditedBrand: (state) => {
            state.isLoading = false
            state.brand.edited = null
        },
        resetDeletedBrand: (state) => {
            state.isLoading = false
            state.brand.deleted = null
        },
        resetRecoveredBrand: (state) => {
            state.isLoading = false
            state.brand.recovered = null
        },
        resetDisplayedBrand: (state) => {
            state.isLoading = false
            state.brand.displayed = null
        }
    },
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

        builder.addCase(getBrandDetail.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getBrandDetail.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.detail = action.payload
            }
        })
        builder.addCase(getBrandDetail.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addBrand.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(addBrand.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.added = action.payload
                state.brand.all!.items.unshift(state.brand.added)
            }
        })
        builder.addCase(addBrand.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editBrand.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(editBrand.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.edited = action.payload
                const brand = state.brand.all!.items.find(item => item.id === action.payload.id)
                if(brand){
                    brand.name = state.brand.edited.name
                    brand.description = state.brand.edited.description
                }
            }
        })
        builder.addCase(editBrand.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(deleteBrand.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.deleted = action.payload
                const brand = state.brand.all!.items.find(item => item.id === action.payload.id)
                if(brand){
                    brand.is_deleted = action.payload.is_deleted
                }
            }
        })
        builder.addCase(deleteBrand.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(recoverBrand.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(recoverBrand.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.recovered = action.payload
                const Brand = state.brand.all!.items.find(item => item.id === action.payload.id)
                if (Brand){
                    Brand.is_deleted = state.brand.recovered.is_deleted
                }
            }
        })
        builder.addCase(recoverBrand.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(displayBrand.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(displayBrand.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.brand.displayed = action.payload
                const Brand = state.brand.all!.items.find(item => item.id === action.payload.id)
                if (Brand){
                    Brand.is_visible = state.brand.displayed.is_visible
                }
            }
        })
        builder.addCase(displayBrand.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
})

export const {
    resetAddedBrand,
    resetEditedBrand,
    resetDeletedBrand,
    resetDisplayedBrand,
    resetRecoveredBrand
} = brandSlice.actions
export default brandSlice.reducer;