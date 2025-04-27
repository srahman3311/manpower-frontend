import { useState, useEffect } from "react";
import { Agent } from "../types/Agent";
import { fetchAgents } from "../../../services/agents";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";

type Return = {
    loading: boolean
    errorMsg: string
    agentList: Agent[]
    totalAgentCount: number
}

export const useFetchAgentsForReports = (): Return => {

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [agentList, setAgentList] = useState<Agent[]>([]);
    const [totalAgentCount, setTotalAgentCount] = useState<number>(0)
    
    useEffect(() => {

        const fetchAgentList = async () => {

            setLoading(true);

            try {

                const { agents, total } = await fetchAgents({
                    searchText: "",
                    skip: 0,
                    limit: 10000
                });
                setAgentList(agents);
                setTotalAgentCount(total)
            
            } catch(error: any) {
                const { message } = handleApiError(error)
                setErrorMsg(message)
            } finally {
                setLoading(false);
            }
            
        }

        fetchAgentList();
        
    }, [])

    return {
        loading,
        errorMsg,
        agentList,
        totalAgentCount
    }

}