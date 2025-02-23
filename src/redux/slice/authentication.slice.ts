import {LoggedInResponse} from "@/type/response/authentication.response.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authenticationApi from "@/api/authentication.api.ts";
import {LoginRequest} from "@/type/request/authentication.request.ts";
interface IState {
    isAuthenticated: boolean
    isLoading: boolean
    authentication: {
        loggedIn: LoggedInResponse | null
    }
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    authentication: {
        loggedIn: null,
    },
}

export const login = createAsyncThunk<LoggedInResponse, LoginRequest>(
    'authentication/login', async (body, thunkAPI) => {
        const response = await authenticationApi.login(body,thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            if (action.payload){
                state.isAuthenticated = false
                state.isLoading = true
            }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload){
                state.isAuthenticated = true
                state.isLoading = false
                state.authentication.loggedIn = action.payload
                window.localStorage.setItem("access_token", state.authentication.loggedIn.access_token)
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            if (action.payload){
                state.isAuthenticated = false
                state.isLoading = false
            }
        })
    }
});

// export const {setUserInfo} = authenticationSlice.actions;
export default authenticationSlice.reducer;