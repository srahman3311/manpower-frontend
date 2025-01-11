import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "../types/CompanyState";

const initialState: CompanyState = {
    searchText: "",
    skip: 0, 
    limit: 20,
    companyList: [],
    newCompanyInfo: {
        name: "",
        email: "",
        phone: "",
        address: ""
    }
}

const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        addNewCompanyInfo: (state, action: PayloadAction<{ name: string, value: string }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newCompanyInfo: {
                    ...state.newCompanyInfo,
                    [name]: value
                }
            }
        }
    }
})

export const {
    updateState,
    addNewCompanyInfo
} = companiesSlice.actions;

export default companiesSlice.reducer;