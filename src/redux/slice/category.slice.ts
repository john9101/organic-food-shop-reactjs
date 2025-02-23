import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddedCategoryResponse, DeletedCategoryResponse, DisplayedCategoryResponse,
    EditedCategoryResponse,
    GotAllCategoriesResponse,
    GotCategoryDetailResponse, RecoveredCategoryResponse
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
        deleted: DeletedCategoryResponse | null
        recovered: RecoveredCategoryResponse | null
        displayed: DisplayedCategoryResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    category: {
        all: null,
        detail: null,
        edited: null,
        added: null,
        deleted: null,
        recovered: null,
        displayed: null,
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

export const deleteCategory = createAsyncThunk<DeletedCategoryResponse, number>(
    'category/deleteCategory', async (id: number, thunkAPI) => {
        const response = await categoryApi.deleteCategory(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const recoverCategory = createAsyncThunk<DeletedCategoryResponse, number>(
    'category/recoverCategory', async (id: number, thunkAPI) => {
        const response = await categoryApi.recoverCategory(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const displayCategory = createAsyncThunk<DisplayedCategoryResponse, {categoryId: number, isVisible: boolean}>(
    'category/displayCategory', async ({categoryId, isVisible}, thunkAPI) => {
        const response = await categoryApi.displayCategory(categoryId, isVisible, thunkAPI);
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
        },
        resetDeletedCategory: (state) => {
            state.isLoading = false
            state.category.deleted = null
        },
        resetRecoveredCategory: (state) => {
            state.isLoading = false
            state.category.recovered = null
        },
        resetDisplayedCategory: (state) => {
            state.isLoading = false
            state.category.displayed = null
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
                const category = state.category.all!.items.find(item => item.id === action.payload.id)
                if (category){
                    category.name = action.payload.name
                    category.description = action.payload.description
                }
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
                state.category.all!.items.unshift(state.category.added)
            }
        })
        builder.addCase(addCategory.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(deleteCategory.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.deleted = action.payload
                const category = state.category.all!.items.find(item => item.id === action.payload.id)
                if (category){
                    category.is_deleted = state.category.deleted.is_deleted
                }
            }
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(recoverCategory.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(recoverCategory.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.recovered = action.payload
                const category = state.category.all!.items.find(item => item.id === action.payload.id)
                if (category){
                    category.is_deleted = state.category.recovered.is_deleted
                }
            }
        })
        builder.addCase(recoverCategory.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(displayCategory.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(displayCategory.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.category.displayed = action.payload
                const category = state.category.all!.items.find(item => item.id === action.payload.id)
                if (category){
                    category.is_visible = state.category.displayed.is_visible
                }
            }
        })
        builder.addCase(displayCategory.rejected, (state, action) => {
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

export const {resetAddedCategory, resetEditedCategory, resetDeletedCategory, resetRecoveredCategory, resetDisplayedCategory} = categorySlice.actions
export default categorySlice.reducer;