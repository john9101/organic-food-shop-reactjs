import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddedVoucherResponse,
    DeletedVoucherResponse, DisplayedVoucherResponse, EditedVoucherResponse,
    GotAllVouchersResponse,
    GotVoucherDetailResponse, RecoveredVoucherResponse
} from "@/type/response/voucher.response.ts";
import voucherApi from "@/api/voucher.api.ts";
import {AddVoucherRequest, EditVoucherRequest} from "@/type/request/voucher.request.ts";

interface IState {
    isLoading: boolean
    voucher: {
        all: GotAllVouchersResponse | null
        detail: GotVoucherDetailResponse | null,
        edited: EditedVoucherResponse | null
        added: AddedVoucherResponse | null
        deleted: DeletedVoucherResponse | null,
        recovered: RecoveredVoucherResponse | null
        displayed: DisplayedVoucherResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    voucher: {
        all: null,
        detail: null,
        added: null,
        edited: null,
        deleted: null,
        recovered: null,
        displayed: null,
    }
}

export const getVoucherDetail = createAsyncThunk<GotVoucherDetailResponse, number>(
    'category/getCategoryDetail', async (id: number, thunkAPI) => {
        const response = await voucherApi.getVoucherDetail(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const editVoucher = createAsyncThunk<EditedVoucherResponse, { body: EditVoucherRequest, voucherId: number }>(
    'voucher/editVoucher', async ({body, voucherId}, thunkAPI) => {
        const response = await voucherApi.editVoucher(voucherId, body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addVoucher = createAsyncThunk<AddedVoucherResponse, AddVoucherRequest>(
    'voucher/addVoucher', async (body, thunkAPI) => {
        const response = await voucherApi.addVoucher(body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const getAllVouchers = createAsyncThunk<GotAllVouchersResponse>(
    'voucher/getAllVoucher', async (_, thunkAPI) => {
        const response = await voucherApi.getAllVouchers(thunkAPI)
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const deleteVoucher = createAsyncThunk<DeletedVoucherResponse, number>(
    'voucher/deleteVoucher', async (id: number, thunkAPI) => {
        const response = await voucherApi.deleteVoucher(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const recoverVoucher = createAsyncThunk<RecoveredVoucherResponse, number>(
    'voucher/recoverVoucher', async (id: number, thunkAPI) => {
        const response = await voucherApi.recoverVoucher(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const displayVoucher = createAsyncThunk<DisplayedVoucherResponse, { voucherId: number, isVisible: boolean }>(
    'voucher/displayVoucher', async ({voucherId, isVisible}, thunkAPI) => {
        const response = await voucherApi.displayVoucher(voucherId, isVisible, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        resetAddedVoucher: (state) => {
            state.isLoading = false
            state.voucher.added = null
        },
        resetEditedVoucher: (state) => {
            state.isLoading = false
            state.voucher.edited = null
        },
        resetDeletedVoucher: (state) => {
            state.isLoading = false
            state.voucher.deleted = null
        },
        resetRecoveredVoucher: (state) => {
            state.isLoading = false
            state.voucher.recovered = null
        },
        resetDisplayedVoucher: (state) => {
            state.isLoading = false
            state.voucher.displayed = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVoucherDetail.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })
        builder.addCase(getVoucherDetail.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.voucher.detail = action.payload
            }
        })
        builder.addCase(getVoucherDetail.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(editVoucher.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(editVoucher.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.voucher.edited = action.payload
                const voucher = state.voucher.all!.items.find(item => item.id === action.payload.id)
                if (voucher) {
                    voucher.code = action.payload.code
                    voucher.quantity = action.payload.quantity
                    voucher.discount_percent = action.payload.discount_percent
                    voucher.effective_date = action.payload.effective_date
                    voucher.expiry_date = action.payload.expiry_date
                }
            }
        })
        builder.addCase(editVoucher.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(addVoucher.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })

        builder.addCase(addVoucher.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.voucher.added = action.payload
                state.voucher.all!.items.unshift(state.voucher.added)
            }
        })
        builder.addCase(addVoucher.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })

        builder.addCase(getAllVouchers.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true
            }
        })
        builder.addCase(getAllVouchers.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.voucher.all = action.payload
            }
        })
        builder.addCase(getAllVouchers.rejected, (state, action) => {
            if (action.payload) {
                state.isLoading = false
            }
        })


        builder.addCase(deleteVoucher.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(deleteVoucher.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.voucher.deleted = action.payload
                const voucher = state.voucher.all!.items.find(item => item.id === action.payload.id)
                if(voucher){
                    voucher.is_deleted = state.voucher.deleted.is_deleted
                }
            }
        })
        builder.addCase(deleteVoucher.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(recoverVoucher.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(recoverVoucher.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.voucher.recovered = action.payload
                const voucher = state.voucher.all!.items.find(item => item.id === action.payload.id)
                if(voucher){
                    voucher.is_deleted = state.voucher.recovered.is_deleted
                }
            }
        })
        builder.addCase(recoverVoucher.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(displayVoucher.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(displayVoucher.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.voucher.displayed = action.payload
                const voucher = state.voucher.all!.items.find(item => item.id === action.payload.id)
                if(voucher){
                    voucher.is_visible = state.voucher.displayed.is_visible
                }
            }
        })
        builder.addCase(displayVoucher.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
})

export const {
    resetAddedVoucher,
    resetEditedVoucher,
    resetDeletedVoucher,
    resetRecoveredVoucher,
    resetDisplayedVoucher
} = voucherSlice.actions
export default voucherSlice.reducer;