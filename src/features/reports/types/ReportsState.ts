import { Agent } from "../../agents/types/Agent"
import { Job } from "../../jobs/types/Job"
import { Passenger } from "../../passengers/types/Passenger"

export interface ReportsState {
    startDate: Date | null
    endDate: Date | null
    job: Job | null
    agent: Agent | null
    isMedicalDone: boolean
    isVisaIssued: boolean
    isFlightDone: boolean
    isBMETFingerDone: boolean
    isVisaApplicationFingerDone: boolean
    passengerList: Passenger[]
    selectedAgent: Agent | null
    selectedJob: Job | null
}