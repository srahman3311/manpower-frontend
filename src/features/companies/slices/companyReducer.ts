import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "../types/CompanyState";
import { Company as ICompany } from "../types/Company";

const initialState: CompanyState = {
    searchText: "",
    skip: 0, 
    limit: 10,
    companyList: [],
    totalCompanyCount: 0,
    newCompanyInfo: {
        name: "",
        email: "",
        phone: "",
        address: ""
    },
    companyInAction: null,
    isDeleting: false
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
        fetchCompanyData: (state, action: PayloadAction<{ companies: ICompany[], totalCompanyCount: number }>) => {
            const { companies, totalCompanyCount } = action.payload;
            return {
                ...state,
                companyList: companies,
                totalCompanyCount
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
        },
        toggleDeleteModal: (state, action: PayloadAction<ICompany | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                companyInAction: action.payload
            }
        },
        filterCompanyList: (state, action: PayloadAction<ICompany[]>) => {
            return {
                ...state,
                totalCompanyCount: state.totalCompanyCount - 1,
                companyList: action.payload
            }
        }
    }
})

export const {
    updateState,
    fetchCompanyData,
    addNewCompanyInfo,
    toggleDeleteModal,
    filterCompanyList
} = companiesSlice.actions;

export default companiesSlice.reducer;