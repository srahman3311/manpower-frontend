import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, toggleDeleteModal } from "../slices/agentReducer";
import { useFetchAgents } from "../hooks/useFetchAgents";
import peoplePlaceholderImg from "../../../assets/people_placeholder.jpg";
import styles from "../styles/AgentTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const AgentTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchAgentList } = useFetchAgents();
    const agentState = useSelector((state: RootState) => state.agentState);
    const { searchText, skip, limit, totalAgentCount, agentList, newAgentInfo } = agentState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchAgentList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const agentInAction = agentList.find(agent => agent.id.toString() === id);

        if(!agentInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "agentInAction",
                value: agentInAction
            }));
            dispatch(toggleDeleteModal(agentInAction))
            return;
        }

        dispatch(updateState({
            name: "newAgentInfo",
            value: {
                ...newAgentInfo,
                firstName: agentInAction.firstName,
                lastName: agentInAction.lastName,
                email: agentInAction.email ?? "",
                phone: agentInAction.phone,
                category: agentInAction.category,
                address: agentInAction.address.line1 ?? ""
            }
        }))
      
        navigate(`/agents/edit/${id}`);

    }, [agentList, dispatch, updateState])

    const navigateToNextPage = useCallback(() => {
        if(totalAgentCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalAgentCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 6;

    return (
        <div className={styles.agent_table_container}>
            <div className={styles.agent_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th></th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"Loading..."}
                            />
                            :
                            errorMsg 
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={errorMsg}
                            />
                            :
                            agentList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No agent data to show"}
                            />
                            :
                            agentList.map(agent => {
                                const { id, firstName, lastName, email, phone, category, imageUrl } = agent;
                                return (
                                    <tr key={id}>
                                        <td className={styles.people_placeholder_img}>
                                            <img 
                                                src={imageUrl ?? peoplePlaceholderImg}
                                                alt={`${firstName}`}
                                            />
                                        </td>
                                        <td>{category}</td>
                                        <td>{`${firstName} ${lastName}`}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>
                                            <ActionButtons 
                                                actionTypeList={["edit", "delete"]}
                                                itemId={id}
                                                handleClick={handleAction}
                                            />
                                        </td>
                                    </tr>
                                );

                            })}
                    </tbody>
                </table>
            </div>
            <TableDataNavigation 
                skip={skip}
                limit={limit}
                total={totalAgentCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default AgentTable;