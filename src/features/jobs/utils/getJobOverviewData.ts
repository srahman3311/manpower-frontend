import { Passenger } from "../../passengers/types/Passenger";
import { Job } from "../types/Job";

export const getJobOverviewData = (job: Job | null, passengerList: Passenger[]) => {

    let medicalDone = 0;
    let visaApplicationCount = 0;
    let visaApplicationFingerDateCount = 0;
    let BMETFingerCount = 0;
    let visaSold = 0;
    let flightDone = 0;

    for(const passenger of passengerList) {

        if(passenger.medical.date) {
            medicalDone += 1;
        }

        if(passenger.visaApplicationDate) {
            visaApplicationCount += 1;
        }

        if(passenger.visaBMETFingerDate) {
            BMETFingerCount += 1;
        }

        if(passenger.visaApplicationFingerDate) {
            visaApplicationFingerDateCount += 1;
        }

        if(passenger.visaNumber) {
            visaSold += 1;
        }

        const isFlightDone = passenger.flights.some(flight => flight.number)
        if(isFlightDone) {
            flightDone += 1;
        }

    }

    const data = [
        { title: "Total Visa Quantity", content: job?.visaQuantity },
        { title: "Passenger Enlisted", content: passengerList.length },
        { title: "Medical", content: medicalDone },
        { title: "Tasheer/Mofa", content: visaApplicationCount },
        { title: "Tasheer/Mofa Finger", content: visaApplicationFingerDateCount },
        { title: "BMET Finger", content: BMETFingerCount },
        { title: "Visa", content: visaSold },
        { title: "Flight", content: flightDone },
    ];

    return data

}