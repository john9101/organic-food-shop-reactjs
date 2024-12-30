import {AddedCustomerResponse, GotAllCustomersResponse} from "@/type/response/user.response.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userApi from "@/api/user.api.ts";
import {AddCustomerRequest} from "@/type/request/user.request.ts";

interface IState {
    isLoading: boolean
    user: {
        customer: {
            all: GotAllCustomersResponse | null;
            added: AddedCustomerResponse | null;
        }
    }
}

const initialState: IState = {
    isLoading: true,
    user: {
        customer: {
            all: null,
            added: null
        }
    }
}

export const getAllCustomers = createAsyncThunk<GotAllCustomersResponse>(
    'user/getAllCustomers', async (_,thunkAPI) => {
        const response = await userApi.getAllCustomers(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addCustomer = createAsyncThunk<AddedCustomerResponse, AddCustomerRequest>(
    'user/addCustomer', async (body,thunkAPI) => {
        const response = await userApi.addCustomer(body, thunkAPI)
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
    }
})

export const {resetAddedCustomer} = userSlice.actions;
export default userSlice.reducer;