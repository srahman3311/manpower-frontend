import { _Address } from "../../../types/Address";
import { 
    NewMedicalInfo, 
    NewPassengerInfo, 
    NewPassportInfo 
} from "../types/PassengerState";
import { isObjectEmpty } from "../../../utils/isObjectEmpty";

type Args = {
    newPassengerInfo: NewPassengerInfo
    passportInfo: NewPassportInfo
    medicalInfo: NewMedicalInfo
    addressInfo: _Address
}

type Return = {
    [key: string]: string | number | Record<string, string> | undefined
}

export const getPassengerRequestBody = (args: Args): Return => {

    const { 
        newPassengerInfo,
        passportInfo,
        medicalInfo,
        addressInfo
    } = args;

    let passenger: Record<string, string | number> = {};
    let passport: Record<string, string> = {};
    let medical: Record<string, string> = {};
    let address: Record<string, string> = {};

    for(const entry of Object.entries(newPassengerInfo)) {

        const [key, value] = entry;

        if(value === "" || value === null) continue;

        if((key === "birthDate" || key === "visaExpiryDate")) {
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
     
        if(value === "" || value === null) continue;

        if((key === "date" || key === "expiryDate")) {
            passport[key] = (value as any).toISOString();
            continue;
        }
            
        passport[key] = value as string;
        
    }

    for(const entry of Object.entries(medicalInfo)) {

        const [key, value] = entry;

        if(value === "" || value === null) continue;

        if((key === "date" || key === "expiryDate")) {
            medical[key] = (value as any).toISOString();
            continue;
        }
            
        medical[key] = value as string;
        
    }

    for(const entry of Object.entries(addressInfo)) {

        const [key, value] = entry;

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