import {
    AddedCustomerResponse,
    DeletedCustomerResponse,
    EditedCustomerResponse,
    GotAllCustomersResponse, GotCustomerDetailResponse
} from "@/type/response/user.response.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userApi from "@/api/user.api.ts";
import {AddCustomerRequest, EditCustomerRequest} from "@/type/request/user.request.ts";

interface IState {
    isLoading: boolean
    user: {
        customer: {
            all: GotAllCustomersResponse | null;
            detail: GotCustomerDetailResponse | null;
            added: AddedCustomerResponse | null;
            edited: EditedCustomerResponse | null;
            deleted: DeletedCustomerResponse | null;
        }
    }
}

const initialState: IState = {
    isLoading: true,
    user: {
        customer: {
            all: null,
            detail: null,
            added: null,
            edited: null,
            deleted: null
        }
    }
}

export const getAllCustomers = createAsyncThunk<GotAllCustomersResponse>(
    'user/getAllCustomers', async (_,thunkAPI) => {
        const response = await userApi.getAllCustomers(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getCustomerDetail = createAsyncThunk<GotCustomerDetailResponse, number>(
    'product/getProductDetail', async (id: number, thunkAPI) => {
        const response = await userApi.getCustomerDetail(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addCustomer = createAsyncThunk<AddedCustomerResponse, AddCustomerRequest>(
    'user/addCustomer', async (body,thunkAPI) => {
        const response = await userApi.addCustomer(body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editCustomer = createAsyncThunk<EditedCustomerResponse, {customerId: number, body: EditCustomerRequest}>(
    'user/editCustomer', async ({customerId, body},thunkAPI) => {
        const response = await userApi.editCustomer(customerId, body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const deleteCustomer = createAsyncThunk<DeletedCustomerResponse, number>(
    'user/deletedCustomer', async (id: number,thunkAPI) => {
        const response = await userApi.deleteCustomer(id, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetAddedCustomer: (state) => {
            state.isLoading = false
            state.user.customer.added = null
        },
        resetEditedCustomer: (state) => {
            state.isLoading = false
            state.user.customer.edited = null
        },
        resetDeletedCustomer: (state) => {
            state.isLoading = false
            state.user.customer.deleted = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCustomers.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAllCustomers.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.customer.all = action.payload
            }
        })
        builder.addCase(getAllCustomers.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(getCustomerDetail.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getCustomerDetail.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.customer.detail = action.payload
            }
        })
        builder.addCase(getCustomerDetail.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addCustomer.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(addCustomer.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.customer.added = action.payload
                state.user.customer.all?.items.unshift(state.user.customer.added)
            }
        })
        builder.addCase(addCustomer.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editCustomer.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(editCustomer.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.customer.edited = action.payload
            }
        })
        builder.addCase(editCustomer.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(deleteCustomer.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.customer.deleted = action.payload
            }
        })
        builder.addCase(deleteCustomer.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
})

export const {resetAddedCustomer, resetEditedCustomer, resetDeletedCustomer} = userSlice.actions;
export default userSlice.reducer;