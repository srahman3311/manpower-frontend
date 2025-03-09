import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Passenger } from "../types/Passenger";
import { PassengerState } from "../types/PassengerState";
import { calculateAge } from "../utils/calculateAge";

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
        birthDate: null,
        age: "",
        nationalId: "",
        fatherName: "",
        motherName: "",
        occupation: "",
        experience: "",
        weight: "",
        height: "",
        cost: "",
        sale: "",
        enjazNumber: "",
        visaNumber: "",
        visaExpiryDate: null,
        idNumber: ""
    },
    passportInfo: {
        number: "",
        date: null,
        expiryDate: null,
        issuingInstitute: ""
    },
    medicalInfo: {
        date: null,
        expiryDate: null,
        status: ""
    },
    addressInfo: {
        line1: "",
        line2: "",
        postalCode: "",
        city: "",
        state: "",
        country: ""
    },
    photo: null,
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
            if(name === "birthDate") {
                return {
                    ...state,
                    newPassengerInfo: {
                        ...state.newPassengerInfo,
                        birthDate: value,
                        age: calculateAge(value).toString()
                    }
                }
            }
            return {
                ...state,
                newPassengerInfo: {
                    ...state.newPassengerInfo,
                    [name]: value
                }
            }
        },
        addNewPassportInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                passportInfo: {
                    ...state.passportInfo,
                    [name]: value
                }
            }
        },
        addNewMedicalInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                medicalInfo: {
                    ...state.medicalInfo,
                    [name]: value
                }
            }
        },
        addNewAddressInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                addressInfo: {
                    ...state.addressInfo,
                    [name]: value
                }
            }
        },
        editPassengerInfo: (state, action: PayloadAction<Passenger>) => {
            const passenger = action.payload;
            const { 
                passport,
                medical,
                address
            } = passenger;
            const birthDate = passenger.birthDate ? new Date(passenger.birthDate) : null;
            return {
                ...state,
                newPassengerInfo: {
                    name: passenger.name,
                    phone: passenger.phone,
                    email: passenger.email ?? "",
                    birthDate,
                    age: birthDate ? calculateAge(birthDate).toString() : "",
                    nationalId: passenger.nationalId ?? "",
                    fatherName: passenger.fatherName ?? "",
                    motherName: passenger.motherName ?? "",
                    occupation: passenger.occupation ?? "",
                    experience: passenger.experience ?? "",
                    weight: passenger.weight ?? "",
                    height: passenger.height ?? "",
                    cost: passenger.cost ? passenger.cost.toString() : "",
                    sale: passenger.sale ? passenger.sale.toString() : "",
                    enjazNumber: passenger.enjazNumber ?? "",
                    visaNumber: passenger.visaNumber ?? "",
                    visaExpiryDate: passenger.visaExpiryDate ? new Date(passenger.visaExpiryDate) : null,
                    idNumber: passenger.idNumber ?? ""
                },
                medicalInfo: {
                    status: medical.status ?? "",
                    date: medical.date ? new Date(medical.date) : null,
                    expiryDate: medical.expiryDate ? new Date(medical.expiryDate) : null
                },
                passportInfo: {
                    number: passport.number ?? "",
                    issuingInstitute: passport.issuingInstitute ?? "",
                    date: passport.date ? new Date(passport.date) : null,
                    expiryDate: passport.expiryDate ? new Date(passport.expiryDate) : null
                },
                addressInfo: {
                    line1: address.line1 ?? "",
                    line2: address.line2 ?? "",
                    postalCode: address.postalCode ?? "",
                    city: address.city ?? "",
                    state: address.state ?? "",
                    country: address.country ?? "",
                },
                selectedAgent: passenger.agent,
                selectedJob: passenger.job
            }
        },

        clearPassengerInfo: (state) => {
            return {
                ...state,
                newPassengerInfo: {
                    name: "",
                    phone: "",
                    email: "",
                    birthDate: null,
                    age: "",
                    nationalId: "",
                    fatherName: "",
                    motherName: "",
                    occupation:  "",
                    experience:  "",
                    weight: "",
                    height: "",
                    cost: "",
                    sale: "",
                    enjazNumber: "",
                    visaNumber: "",
                    visaExpiryDate: null,
                    idNumber: ""
                },
                medicalInfo: {
                    status: "",
                    date: null,
                    expiryDate: null
                },
                passportInfo: {
                    number: "",
                    issuingInstitute: "",
                    date: null,
                    expiryDate: null
                },
                addressInfo: {
                    line1: "",
                    line2: "",
                    postalCode: "",
                    city: "",
                    state: "",
                    country: "",
                },
                selectedAgent: null,
                selectedJob: null
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
    addNewAddressInfo,
    addNewMedicalInfo,
    addNewPassportInfo,
    editPassengerInfo,
    clearPassengerInfo,
    toggleDeleteModal,
    filterPassengerList
} = passengersSlice.actions;

export default passengersSlice.reducer;