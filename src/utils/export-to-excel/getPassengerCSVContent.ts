import { Passenger } from "../../features/passengers/types/Passenger";

export const getPassengerCSVContent = (passengerList: Passenger[]) => {
  
    const headers = "Name, Agent, Job, Passport, Medical, Tasheer/Mofa, Tasheer/Mofa Finger, BMET Finger, Visa, Flight";

    const data = passengerList.map(passenger => {

        const { 
            name,
            agent,
            job,
            passport,
            medical,
            visaApplicationDate,
            visaApplicationFingerDate,
            visaBMETFingerDate,
            visaNumber,
            flights
        } = passenger;

        const data1 = `${name}, ${agent.firstName}, ${job?.name}, ${passport.number}, ${medical.date ? "Done" : ""}`;
        const data2 = `${visaApplicationDate ? "Applied" : ""}, ${visaApplicationFingerDate ? "Done" : ""}`;
        const data3 = `${visaBMETFingerDate ? "Done" : ""}, ${visaNumber ? "Issued" : ""}, ${flights.length ? "Done" : ""}`;

        return data1 + data2 + data3;
        
    });

    return `${headers}\n${data.join("\n")}`;

}