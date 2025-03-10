import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer";
import userReducer from "../features/users/slices/userReducer";
import companyReducer from "../features/companies/slices/companyReducer";
import agentReducer from "../features/agents/slices/agentReducer";
import jobReducer from "../features/jobs/slices/jobReducer"
import passengerReducer from "../features/passengers/slices/passengerReducer";
import expenseReducer from "../features/expenses/slices/expenseReducer";
import revenueReducer from "../features/revenues/slices/revenueReducer";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        authState: authReducer,
        userState: userReducer,
        companyState: companyReducer,
        agentState: agentReducer,
        jobState: jobReducer,
        passengerState: passengerReducer,
        expenseState: expenseReducer,
        revenueState: revenueReducer
    }
});

export default store;