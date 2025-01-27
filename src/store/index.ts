import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer";
import userReducer from "../features/users/slices/userReducer";
import companyReducer from "../features/companies/slices/companyReducer"

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        authState: authReducer,
        userState: userReducer,
        companyState: companyReducer
    }
});

export default store;