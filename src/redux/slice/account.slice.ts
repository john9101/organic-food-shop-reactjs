import {IntrospectedOrLoggedInResponse} from "@/type/response/authentication.response.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import authenticationApi from "@/api/authentication.api.ts";

interface IState {
    isAuthenticated: boolean
    isLoading: boolean
    userInfo: IntrospectedOrLoggedInResponse['user_info'] | null
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    userInfo: null
}

export const introspect = createAsyncThunk(
    'account/introspect', async () => {
        const response = await authenticationApi.introspect();
        return response.data.data;
    });

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IntrospectedOrLoggedInResponse>) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.userInfo = action.payload.user_info
        }
    },
    extraReducers: (builder) => {
        builder.addCase(introspect.pending, (state, action) => {
            if (action.payload){
                state.isAuthenticated = false
                state.isLoading = true
            }
        })
        builder.addCase(introspect.fulfilled, (state, action) => {
            if (action.payload){
                state.isAuthenticated = true
                state.isLoading = false
                state.userInfo = action.payload.user_info
            }
        })
        builder.addCase(introspect.rejected, (state, action) => {
            if (action.payload){
                state.isAuthenticated = false
                state.isLoading = false
            }
        })
    }
});

export const {setUserInfo} = accountSlice.actions;
export default accountSlice.reducer;