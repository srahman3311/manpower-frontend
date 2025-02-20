import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Revenue } from "../types/Revenue";
import { RevenueState } from "../types/RevenueState";

const initialState: RevenueState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalRevenueCount: 0,
    revenueList: [],
    newRevenueInfo: {
        name: "",
        description: "",
        amount: ""
    },
    selectedJob: null,
    selectedPassenger: null,
    revenueInAction: null,
    isDeleting: false 
}

const revenuesSlice = createSlice({
    name: "revenues",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchRevenueData: (state, action: PayloadAction<{ revenues: Revenue[], totalRevenueCount: number }>) => {
            const { revenues, totalRevenueCount } = action.payload;
            return {
                ...state,
                revenueList: revenues,
                totalRevenueCount
            }
        },
        addNewRevenueInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newRevenueInfo: {
                    ...state.newRevenueInfo,
                    [name]: value
                }
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<Revenue | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                revenueInAction: action.payload
            }
        },
        filterRevenueList: (state, action: PayloadAction<Revenue[]>) => {
            return {
                ...state,
                totalRevenueCount: state.totalRevenueCount - 1,
                revenueList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchRevenueData,
    addNewRevenueInfo,
    toggleDeleteModal,
    filterRevenueList
} = revenuesSlice.actions;

export default revenuesSlice.reducer;