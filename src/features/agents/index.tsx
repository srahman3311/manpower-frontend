import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterAgentList } from "./slices/agentReducer";
import { deleteAgent } from "../../services/agents";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import AgentTable from "./components/AgentTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const AgentList: React.FC = () => {

    const dispatch = useDispatch()
    const agentState = useSelector((state: RootState) => state.agentState);
    const { 
        searchText,
        agentList,
        limit,
        isDeleting, 
        agentInAction 
    } = agentState;

    const searchAgents = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateState({
            name: "searchText",
            value: event.target.value
        }))
    }, [dispatch, updateState])   

    const closeDeleteModal = () => {
        dispatch(toggleDeleteModal(null))
    }

    const handleLimitChange = (item: { id: number, limit: number }) => {
        dispatch(updateState({
            name: "limit",
            value: item.limit
        }))
    }

    const deleteAgentInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteAgent(agentInAction?.id);
            const filteredAgentList = agentList.filter(agent => agent.id !== agentInAction?.id);
            dispatch(filterAgentList(filteredAgentList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteAgent, dispatch, filterAgentList, agentList, agentInAction?.id])

    return (
        <div className={styles.agent_list}>
            <div className={styles.search_add}>
                <h2>Agents</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchAgents}
                        value={searchText}
                    />
                    <Link className={styles.add_new_agent} to="/agents/add-new">
                        <IoMdAdd 
                            size={"2rem"}
                        />
                    </Link>
                </div>
                
                <div className={styles.limit_dropdown}>
                    <DropdownList 
                        data={[
                            { id: 1, limit: 10 },
                            { id: 2, limit: 20 },
                            { id: 3, limit: 50 }
                        ]}
                        nameKey="limit"
                        selectedValue={limit}
                        onClick={handleLimitChange}
                    />
                </div>
            </div>
            <AgentTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={agentInAction?.firstName}
                    deleteItem={deleteAgentInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default AgentList;

