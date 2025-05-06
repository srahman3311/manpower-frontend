import { Passenger } from "../types/Passenger";

export const getPassengerGeneralData = (passenger?: Passenger | null) => {

    const data = [
        { title: "Name", content: passenger?.name },
        { title: "Age", content: passenger?.age?.toString() ?? "TBA" },
        { title: "Phone", content: passenger?.phone },
        { title: "Email", content: passenger?.email ?? "TBA" },
        { title: "Father Name", content: passenger?.fatherName ?? "TBA" },
        { title: "Mother Name", content: passenger?.motherName ?? "TBA" },
        { title: "National ID", content: passenger?.nationalId ?? "TBA" },
    ];

    return data;

}