import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportsState } from "../types/ReportsState";

const initialState: ReportsState = {
    startDate: null,
    endDate: null,
    job: null,
    agent: null,
    isMedicalDone: false,
    isVisaIssued: false,
    isFlightDone: false,
    isBMETFingerDone: false,
    isVisaApplicationFingerDone: false,
    passengerList: [],
    selectedAgent: null,
    selectedJob: null
}

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
    }
})

export const {
    updateState
} = reportsSlice.actions;

export default reportsSlice.reducer;