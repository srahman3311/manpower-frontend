import { NewPassengerInfo } from "../types/PassengerState";

export const getPassengerRequestBody = (newPassengerInfo: NewPassengerInfo) => {

    let reqBody: Record<string, string | number> = {};

    for(const entry of Object.entries(newPassengerInfo)) {

        const [key, value] = entry;

        if(value === "") continue;
    
        if(key === "age") {
            reqBody[key] = parseInt(value);
            continue;
        }
            
        reqBody[key] = value;
        
    }

    return reqBody;

}