import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Passenger } from "../types/Passenger";
import { PassengerState } from "../types/PassengerState";

const initialState: PassengerState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalPassengerCount: 0,
    passengerList: [],
    newPassengerInfo: {
        name: "",
        phone: "",
        email: "",
        address: "",
        fatherName: "",
        motherName: "",
        age: "",
        occupation: "",
        experience: "",
        weight: "",
        height: "",
        nationalId: "",
    },
    photo: null,
    birthDate: null,
    selectedAgent: null,
    selectedJob: null,
    passengerInAction: null,
    isDeleting: false 
}

const passengersSlice = createSlice({
    name: "passengers",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchPassengerData: (state, action: PayloadAction<{ passengers: Passenger[], totalPassengerCount: number }>) => {
            const { passengers, totalPassengerCount } = action.payload;
            return {
                ...state,
                passengerList: passengers,
                totalPassengerCount
            }
        },
        addNewPassengerInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newPassengerInfo: {
                    ...state.newPassengerInfo,
                    [name]: value
                }
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<Passenger | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                userInAction: action.payload
            }
        },
        filterPassengerList: (state, action: PayloadAction<Passenger[]>) => {
            return {
                ...state,
                totalPassengerCount: state.totalPassengerCount - 1,
                passengerList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchPassengerData,
    addNewPassengerInfo,
    toggleDeleteModal,
    filterPassengerList
} = passengersSlice.actions;

export default passengersSlice.reducer;