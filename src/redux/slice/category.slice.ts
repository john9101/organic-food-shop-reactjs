import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddedCategoryResponse,
    EditedCategoryResponse,
    GotAllCategoriesResponse,
    GotCategoryDetailResponse
} from "@/type/response/category.response.ts";
import categoryApi from "@/api/category.api.ts";
import {AddCategoryRequest, EditCategoryRequest} from "@/type/request/category.request.ts";

interface IState {
    isLoading: boolean
    category: {
        all: GotAllCategoriesResponse | null
        detail: GotCategoryDetailResponse | null
        edited: EditedCategoryResponse | null
        added: AddedCategoryResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    category: {
        all: null,
        detail: null,
        edited: null,
        added: null,
    }
}

export const getCategoryDetail = createAsyncThunk<GotCategoryDetailResponse, number>(
    'category/getCategoryDetail', async (id: number, thunkAPI) => {
        const response = await categoryApi.getCategoryDetail(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editCategory = createAsyncThunk<EditedCategoryResponse, { body: EditCategoryRequest, categoryId: number }>(
    'category/editCategory', async ({body, categoryId}, thunkAPI) => {
        const response = await categoryApi.editCategory(categoryId, body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addCategory = createAsyncThunk<AddedCategoryResponse, AddCategoryRequest>(
    'category/addCategory', async (body,thunkAPI) => {
        const response = await categoryApi.addCategory(body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getAllCategories = createAsyncThunk<GotAllCategoriesResponse>(
    'category/getAllCategories', async (_,thunkAPI) => {
        const response = await categoryApi.getAllCategories(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetAddedCategory: (state) => {
            state.isLoading = false
            state.category.added = null
        },
        resetEditedCategory: (state) => {
            state.isLoading = false
            state.category.edited = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryDetail.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.detail = action.payload
            }
        })
        builder.addCase(getCategoryDetail.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editCategory.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(editCategory.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.edited = action.payload
            }
        })
        builder.addCase(editCategory.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addCategory.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(addCategory.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.added = action.payload
            }
        })
        builder.addCase(addCategory.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(getAllCategories.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.all = action.payload
            }
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

    }
})

export const {resetAddedCategory, resetEditedCategory} = categorySlice.actions
export default categorySlice.reducer;