import { Agent as IAgent } from "./Agent";

export type NewAgentInfo = Pick<IAgent, "firstName" | "lastName" | "phone" | "category"> & {
    email: string
    address: string
}

export interface AgentState {
    searchText: string
    skip: number
    limit: number
    totalAgentCount: number
    agentList: IAgent[]
    newAgentInfo: NewAgentInfo
    photo: File | null
    agentInAction: IAgent | null
    isDeleting: boolean
}