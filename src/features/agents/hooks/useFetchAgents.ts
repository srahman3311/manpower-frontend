import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AgentState } from "../types/AgentState";
import { fetchAgents } from "../../../services/agents";
import { fetchAgentData } from "../slices/agentReducer";

type Params = Pick<AgentState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchAgentList: (params: Params) => Promise<void>
}

export const useFetchAgents = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchAgentList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { agents, total } = await fetchAgents(params);

            dispatch(fetchAgentData({
                agents,
                totalAgentCount: total
            }));

        } catch(error: any) {
            
            setErrorMsg(error.response?.data || error.message)

        } finally {
            setLoading(false);
        }
        
    }, [])

    return {
        loading,
        errorMsg,
        fetchAgentList
    }

}