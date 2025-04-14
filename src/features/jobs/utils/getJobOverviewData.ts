import { Passenger } from "../../passengers/types/Passenger";
import { Job } from "../types/Job";

export const getJobOverviewData = (job: Job | null, passengerList: Passenger[]) => {

    let medicalDone = 0;
    let visaSold = 0;

    for(const passenger of passengerList) {
        if(passenger.medical.date) {
            medicalDone += 1;
        }
        if(passenger.visaNumber) {
            visaSold += 1;
        }
    }

    const data = [
        { title: "Medical Done", content: medicalDone },
        { title: "Visa Sold", content: visaSold },
        { title: "Visa Left", content: (job?.visaQuantity ?? 0) - visaSold },
        { title: "Passenger Enlisted", content: passengerList.length }
    ];

    return data

}