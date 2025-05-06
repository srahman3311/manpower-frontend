import { Passenger } from "../types/Passenger";

export const getPassengerVisaFlightData = (passenger?: Passenger | null) => {

    if(!passenger) return [];

    const { 
        visaNumber,
        visaIssueDate,
        visaExpiryDate,
        visaApplicationDate,
        visaApplicationFingerDate,
        visaApplicationNumber,
        visaBMETFingerDate
    } = passenger;

    const medicalPassportData = [
        { 
            title: "Tasheer", 
            content: visaApplicationNumber ?? "TBA" 
        },
        { 
            title: "Tasheer Date", 
            content: visaApplicationDate ? new Date( visaApplicationDate).toDateString() : "TBA" 
        },
        { 
            title: "Tashee Finger Date", 
            content: visaApplicationFingerDate ? new Date(visaApplicationFingerDate).toDateString() : "TBA" 
        },
        { 
            title: "BMET Date", 
            content: visaBMETFingerDate ? new Date(visaBMETFingerDate).toDateString() : "TBA" 
        },
        { 
            title: "Visa Number", 
            content: visaNumber ?? "TBA" 
        },
        { 
            title: "Visa Issue Date", 
            content: visaIssueDate ? new Date(visaIssueDate).toDateString() : "TBA" 
        },
        { 
            title: "Visa Expiry Date", 
            content: visaExpiryDate ? new Date(visaExpiryDate).toDateString() : "TBA" 
        }
    ];

    return medicalPassportData;

}