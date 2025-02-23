import {
    AddedCustomerResponse, AddedEmployeeResponse,
    DeletedCustomerResponse, DeletedEmployeeResponse,
    EditedCustomerResponse, EditedEmployeeResponse,
    GotAllCustomersResponse, GotAllEmployeesResponse, GotCustomerDetailResponse, GotEmployeeDetailResponse
} from "@/type/response/user.response.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userApi from "@/api/user.api.ts";
import {
    AddCustomerRequest,
    AddEmployeeRequest,
    EditCustomerRequest,
    EditEmployeeRequest
} from "@/type/request/user.request.ts";

interface IState {
    isLoading: boolean
    user: {
        customer: {
            all: GotAllCustomersResponse | null;
            detail: GotCustomerDetailResponse | null;
            added: AddedCustomerResponse | null;
            edited: EditedCustomerResponse | null;
            deleted: DeletedCustomerResponse | null;
        },
        employee: {
            all: GotAllEmployeesResponse | null;
            detail: GotEmployeeDetailResponse | null;
            added: AddedEmployeeResponse | null;
            edited: EditedEmployeeResponse | null;
            deleted: DeletedEmployeeResponse | null;
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
        },
        employee: {
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
    'user/getCustomerDetail', async (id: number, thunkAPI) => {
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
    'user/deleteCustomer', async (id: number,thunkAPI) => {
        const response = await userApi.deleteCustomer(id, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getAllEmployees = createAsyncThunk<GotAllEmployeesResponse>(
    'user/getAllEmployees', async (_,thunkAPI) => {
        const response = await userApi.getAllEmployees(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getEmployeeDetail = createAsyncThunk<GotEmployeeDetailResponse, number>(
    'user/getEmployeeDetail', async (id: number, thunkAPI) => {
        const response = await userApi.getEmployeeDetail(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addEmployee = createAsyncThunk<AddedEmployeeResponse, AddEmployeeRequest>(
    'user/addEmployee', async (body,thunkAPI) => {
        const response = await userApi.addEmployee(body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editEmployee = createAsyncThunk<EditedEmployeeResponse, {employeeId: number, body: EditEmployeeRequest}>(
    'user/editEmployee', async ({employeeId, body},thunkAPI) => {
        const response = await userApi.editEmployee(employeeId, body, thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const deleteEmployee = createAsyncThunk<DeletedEmployeeResponse, number>(
    'user/deleteEmployee', async (id: number,thunkAPI) => {
        const response = await userApi.deleteEmployee(id, thunkAPI)
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
        },
        resetAddedEmployee: (state) => {
            state.isLoading = false
            state.user.employee.added = null
        },
        resetEditedEmployee: (state) => {
            state.isLoading = false
            state.user.employee.edited = null
        },
        resetDeletedEmployee: (state) => {
            state.isLoading = false
            state.user.employee.deleted = null
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

        builder.addCase(getAllEmployees.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAllEmployees.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.employee.all = action.payload
            }
        })
        builder.addCase(getAllEmployees.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(getEmployeeDetail.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getEmployeeDetail.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.customer.detail = action.payload
            }
        })
        builder.addCase(getEmployeeDetail.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addEmployee.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.employee.added = action.payload
                // state.user.employee.all?.items.unshift(state.user.employee.added)
            }
        })
        builder.addCase(addEmployee.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editEmployee.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(editEmployee.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.employee.edited = action.payload
            }
        })
        builder.addCase(editEmployee.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(deleteEmployee.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.user.employee.deleted = action.payload
            }
        })
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

    }
})

export const {resetAddedCustomer, resetEditedCustomer, resetDeletedCustomer, resetAddedEmployee, resetEditedEmployee, resetDeletedEmployee} = userSlice.actions;
export default userSlice.reducer;