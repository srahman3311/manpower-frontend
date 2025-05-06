import { Passenger } from "../types/Passenger";

export const getPassengerMedicalPassportData = (passenger?: Passenger | null) => {

    if(!passenger) return [];

    const { 
        passport,
        medical
    } = passenger;

    const medicalPassportData = [
        { 
            title: "Passport", 
            content: passport.number ?? "TBA" 
        },
        { 
            title: "Passport Date", 
            content: passport.date ? new Date(passport.date).toDateString() : "TBA" 
        },
        { 
            title: "Passport Expiry Date", 
            content: passport.expiryDate ? new Date(passport.expiryDate).toDateString() : "TBA" 
        },
        { 
            title: "Medical Date", 
            content: medical.date ? new Date(medical.date).toDateString() : "TBA" 
        },
        { 
            title: "Medical Expiry Date", 
            content: medical.expiryDate ? new Date(medical.expiryDate).toDateString() : "TBA" 
        },
    ];

    return medicalPassportData;

}