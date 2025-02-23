import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddedAccountAddressResponse,
    ChangedPasswordAccountResponse, DeleteAccountAddressResponse, EditedAccountAddressResponse,
    EditedAccountInfoResponse, GotAccountAddressDetailResponse, GotAccountAddressesResponse,
    GotAccountInfoResponse
} from "@/type/response/account.response.ts";
import {accountApi} from "@/api/account.api.ts";
import {
    AddAccountAddressRequest,
    ChangePasswordAccountRequest, EditAccountAddressRequest,
    EditAccountInfoRequest
} from "@/type/request/account.request.ts";

interface IState {
    isLoading: boolean
    account: {
        info: {
            got: GotAccountInfoResponse | null,
            edited: EditedAccountInfoResponse | null
        },
        password: {
            changed: ChangedPasswordAccountResponse | null
        },
        address: {
            got: GotAccountAddressesResponse | null,
            gotDetail: GotAccountAddressDetailResponse | null
            added: AddedAccountAddressResponse | null,
            edited: EditedAccountAddressResponse | null
            deleted: DeleteAccountAddressResponse | null
        }
    }
}

const initialState: IState = {
    isLoading: true,
    account: {
        info: {
            got: null,
            edited: null
        },
        password: {
            changed: null
        },
        address: {
            got: null,
            gotDetail: null,
            added: null,
            edited: null,
            deleted: null
        }
    }
}

export const getAccountInfo = createAsyncThunk<GotAccountInfoResponse>(
    'account/getAccountInfo', async (_, thunkAPI) => {
        const response = await accountApi.getAccountInfo(thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editAccountInfo = createAsyncThunk<EditedAccountInfoResponse, EditAccountInfoRequest>(
    'account/editAccountInfo', async (body, thunkAPI) => {
        const response = await accountApi.editAccountInfo(body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const changePasswordAccount = createAsyncThunk<ChangedPasswordAccountResponse, ChangePasswordAccountRequest>(
    'account/changePasswordAccount', async (body, thunkAPI) => {
        const response = await accountApi.changePasswordAccount(body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getAccountAddresses = createAsyncThunk<GotAccountAddressesResponse>(
    'account/getAccountAddresses', async (_, thunkAPI) => {
        const response = await accountApi.getAccountAddresses(thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getAccountAddressDetail = createAsyncThunk<GotAccountAddressDetailResponse, number>(
    'account/getAccountAddressDetail', async (id, thunkAPI) => {
        const response = await accountApi.getAccountAddressDetail(id,thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addAccountAddress = createAsyncThunk<AddedAccountAddressResponse, AddAccountAddressRequest>(
    'account/addAccountAddress', async (body, thunkAPI) => {
        const response = await accountApi.addAccountAddress(body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editAccountAddress = createAsyncThunk<EditedAccountAddressResponse, {id: number, body: EditAccountAddressRequest}>(
    'account/editAccountAddress', async ({id, body}, thunkAPI) => {
        const response = await accountApi.editAccountAddress(id, body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const deleteAccountAddress = createAsyncThunk<DeleteAccountAddressResponse, number>(
    'account/deleteAccountAddress', async (id, thunkAPI) => {
        const response = await accountApi.deleteAccountAddress(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        resetEditedAccountInfo: (state) => {
            state.isLoading = false;
            state.account.info.edited = null
        },
        resetChangedAccountPassword: (state) => {
            state.isLoading = false;
            state.account.password.changed = null
        },
        resetAddedAccountAddress: (state) => {
            state.isLoading = false;
            state.account.address.added = null
        },
        resetEditedAccountAddress: (state) => {
            state.isLoading = false;
            state.account.address.edited = null
        },
        resetDeletedAccountAddress: (state) => {
            state.isLoading = false;
            state.account.address.deleted = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccountInfo.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAccountInfo.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.info.got = action.payload
            }
        })
        builder.addCase(getAccountInfo.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editAccountInfo.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(editAccountInfo.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.info.edited = action.payload
            }
        })
        builder.addCase(editAccountInfo.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(changePasswordAccount.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(changePasswordAccount.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.password.changed = action.payload
            }
        })
        builder.addCase(changePasswordAccount.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })



        builder.addCase(getAccountAddresses.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAccountAddresses.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.address.got = action.payload
            }
        })
        builder.addCase(getAccountAddresses.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(getAccountAddressDetail.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getAccountAddressDetail.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.address.gotDetail = action.payload
            }
        })
        builder.addCase(getAccountAddressDetail.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addAccountAddress.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(addAccountAddress.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.address.added = action.payload
                state.account.address.got!.items.push(state.account.address.added)
            }
        })
        builder.addCase(addAccountAddress.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(editAccountAddress.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(editAccountAddress.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.address.edited = action.payload
                const address = state.account.address.got!.items.find(item => item.id === action.payload.id)
                if (address){
                    address.specific_place = state.account.address.edited.specific_place
                    address.province = state.account.address.edited.province
                    address.district = state.account.address.edited.district
                    address.commune = state.account.address.edited.commune
                }
            }
        })
        builder.addCase(editAccountAddress.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(deleteAccountAddress.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })

        builder.addCase(deleteAccountAddress.fulfilled, (state, action) => {
            if (action.payload){
                state.isLoading = false
                state.account.address.deleted = action.payload
                const addressIndex = state.account.address.got!.items.findIndex(item => item.id === action.payload.id)
                state.account.address.got!.items.splice(addressIndex, 1)
            }
        })
        builder.addCase(deleteAccountAddress.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
});

export const {resetEditedAccountInfo, resetChangedAccountPassword, resetEditedAccountAddress, resetDeletedAccountAddress, resetAddedAccountAddress} = accountSlice.actions;
export default accountSlice.reducer;