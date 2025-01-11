import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/UserState";

const initialState: UserState = {
    email: "",
    password: ""
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        }

    }
})

export const {
    updateState
} = usersSlice.actions;

export default usersSlice.reducer;