import httpClient from "./httpClient";
import { Agent as IAgent } from "../features/agents/types/Agent";
import { NewAgentInfo, AgentState } from "../features/agents/types/AgentState";

type Params = Pick<AgentState, "searchText" | "skip" | "limit">;
type RequestBody = Partial<Omit<NewAgentInfo, "address">> & {
    imageUrl?: string
    address: {
        line1: string | null
    }
}

export const fetchAgents = async(params: Params): Promise<{ agents: IAgent[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/agents?${paramString}`);
}

export const createAgent = async(requestBody: RequestBody): Promise<IAgent> => {
    return httpClient.post("/agents/create", requestBody);
}

export const editAgent = async(agentId: string, requestBody: RequestBody): Promise<IAgent> => {
    return httpClient.patch(`/agents/${agentId}/edit`, requestBody);
}

export const deleteAgent = async(agentId?: number): Promise<void> => {
    return httpClient.delete(`/agents/${agentId}/delete`);
}

