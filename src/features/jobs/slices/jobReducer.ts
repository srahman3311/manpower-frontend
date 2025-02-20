import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job as IJob } from "../types/Job";
import { JobState } from "../types/JobState";

const initialState: JobState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalJobCount: 0,
    jobList: [],
    visaCompanyList: [],
    newJobInfo: {
        name: "",
        visaType: "sale",
        visaName: "sale",
        visaQuantity: "",
        visaUnitPrice: "",
    },
    selectedVisaCompany: null,
    jobInAction: null,
    isDeleting: false 
}

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchJobData: (state, action: PayloadAction<{ jobs: IJob[], totalJobCount: number }>) => {
            const { jobs, totalJobCount } = action.payload;
            return {
                ...state,
                jobList: jobs,
                totalJobCount
            }
        },
        addNewJobInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newJobInfo: {
                    ...state.newJobInfo,
                    [name]: value
                }
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<IJob | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                jobInAction: action.payload
            }
        },
        filterJobList: (state, action: PayloadAction<IJob[]>) => {
            return {
                ...state,
                totalJobCount: state.totalJobCount - 1,
                jobList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchJobData,
    addNewJobInfo,
    toggleDeleteModal,
    filterJobList
} = jobsSlice.actions;

export default jobsSlice.reducer;