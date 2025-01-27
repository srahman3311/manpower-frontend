import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAuthUser } from "../../services/users";
import { AuthState } from "./AuthState";

export const fetchUser = createAsyncThunk("auth/fetchUser", async() => {
    const user = await fetchAuthUser();
    return user;
})

const initialState: AuthState = {
    email: "",
    password: "",
    status: "idle",
    error: null,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: string }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? "Something went wrong"
            })
    }
})

export const {
    updateState,
} = authSlice.actions;

export default authSlice.reducer;