import { Passenger } from "../types/Passenger";
import { _Address } from "../../../types/Address";
import { 
    NewMedicalInfo, 
    NewPassengerInfo, 
    NewPassportInfo 
} from "../types/PassengerState";
import { isObjectEmpty } from "../../../utils/isObjectEmpty";


type Args = {
    passengerInAction: Passenger | null
    newPassengerInfo: NewPassengerInfo
    passportInfo: NewPassportInfo
    medicalInfo: NewMedicalInfo
    addressInfo: _Address
}

type Return = {
    [key: string]: string | number | Record<string, string | null> | undefined
}

export const getPassengerRequestBody = (args: Args): Return => {

    const { 
        passengerInAction,
        newPassengerInfo,
        passportInfo,
        medicalInfo,
        addressInfo
    } = args;

    let passenger: Record<string, string | number | null> = {};
    let passport: Record<string, string | null> = {};
    let medical: Record<string, string | null> = {};
    let address: Record<string, string | null> = {};

    for(const entry of Object.entries(newPassengerInfo)) {

        const [key, value] = entry;

        // If new passenger is being edited
        if(
            passengerInAction && 
            (passengerInAction as any)[key] && 
            (value === "" || value === null)
        ) {
            if(key === "cost" || key === "sale") {
                passenger[key] = 0;
            }  else {
                passenger[key] = null;
            }
            continue;
        }

        if(value === "" || value === null) continue;

        if((key === "birthDate" || key === "visaExpiryDate") && value) {
            passenger[key] = (value as any).toISOString();
            continue;
        }
    
        if((key === "age" || key === "cost" || key === "sale") && value) {
            passenger[key] = parseInt(value as string);
            continue;
        }
            
        passenger[key] = value as string;
        
    }

    for(const entry of Object.entries(passportInfo)) {

        const [key, value] = entry;
    
        // If passenger is being edited
        if(
            (passengerInAction as any)?.passport[key] && 
            (value === "" || value === null)
        ) {
            passport[key] = null;
            continue;
        }

        if(value === "" || value === null) continue;

        if((key === "date" || key === "expiryDate")) {
            passport[key] = (value as any).toISOString();
            continue;
        }
            
        passport[key] = value as string;
        
    }

    for(const entry of Object.entries(medicalInfo)) {

        const [key, value] = entry;

        // If passenger is being edited
        if(
            (passengerInAction as any)?.medical[key] && 
            (value === "" || value === null)
        ) {
            medical[key] = null;
            continue;
        }

        if(value === "" || value === null) continue;

        if((key === "date" || key === "expiryDate")) {
            medical[key] = (value as any).toISOString();
            continue;
        }
            
        medical[key] = value as string;
        
    }

    for(const entry of Object.entries(addressInfo)) {

        const [key, value] = entry;

        // If passenger is being edited
        if(
            (passengerInAction as any)?.address[key] && 
            value === ""
        ) {
            address[key] = null;
            continue;
        }

        if(value === "") continue;
            
        address[key] = value;
        
    }

    return {
        ...passenger,
        passport: !(isObjectEmpty(passport)) ? {...passport} : undefined,
        medical: !(isObjectEmpty(medical)) ? {...medical} : undefined,
        address: !(isObjectEmpty(address)) ? {...address} : undefined,
    };

}