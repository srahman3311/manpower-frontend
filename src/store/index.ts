import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/slices/userReducer";
import companyReducer from "../features/companies/slices/companyReducer"

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        authState: authReducer,
        companyState: companyReducer
    }
});

export default store;