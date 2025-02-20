import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
// import { UserRole } from "../../users/types/User";
import { updateState, toggleDeleteModal } from "../slices/revenueReducer";
// import { toggleExpenseApprovalStatus } from "../../../services/expenses";
import { useFetchRevenues } from "../hooks/useFetchRevenues";
import styles from "../styles/RevenueTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const RevenueTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchRevenueList } = useFetchRevenues();
    // const authState = useSelector((state: RootState) => state.authState);
    const revenueState = useSelector((state: RootState) => state.revenueState);
    // const { user } = authState;
    const { searchText, skip, limit, totalRevenueCount, revenueList, newRevenueInfo } = revenueState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchRevenueList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const revenueInAction = revenueList.find(expense => expense.id.toString() === id);

        if(!revenueInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "revenueInAction",
                value: revenueInAction
            }));
            dispatch(toggleDeleteModal(revenueInAction))
            return;
        }

        dispatch(updateState({
            name: "newRevenueInfo",
            value: {
                ...newRevenueInfo,
                name: revenueInAction.name,
                description: revenueInAction.description ?? "",
                amount: revenueInAction.amount.toString()
            }
        }))

        dispatch(updateState({
            name: "selectedJob",
            value: revenueInAction.job
        }));

        dispatch(updateState({
            name: "selectedPassenger",
            value: revenueInAction.passenger
        }));

        navigate(`/revenues/edit/${id}`);

    }, [revenueList, dispatch, updateState])

    // const toggleRevenueStatus = async (revenueId: number) => {
    //     try {
    //         const updatedExpense = await toggleExpenseApprovalStatus(revenueId);
    //         const newExpenseList = revenueList.map(expense => {
    //             if(updatedExpense.id === expense.id) return updatedExpense;
    //             return expense;
    //         });

    //         dispatch(updateState({
    //             name: "revenueList",
    //             value: newExpenseList
    //         }))

    //         console.log(updatedExpense)

    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    const navigateToNextPage = useCallback(() => {
        if(totalRevenueCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalRevenueCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 6;

    // const isNotBasicUser = useMemo(() => user?.roles.some(role => role.name !== UserRole.Basic), [user?.roles.length]);

    // const role = user?.roles[0] ? user?.roles[0].name : "admin";
    // let statusKey = role + "ApprovalStatus";

    return (
        <div className={styles.revenue_table_container}>
            <div className={styles.revenue_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Job</th>
                            <th>Passenger</th>
                            {/* {
                                isNotBasicUser
                                ?
                                <th>Action</th>
                                :
                                null
                            } */}
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
                            revenueList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No expense data to show"}
                            />
                            :
                            revenueList.map(expense => {
                                const { id, name, description, amount, job, passenger } = expense;
                                // const btnText = (expense as any)[statusKey] === "approved" ? "reject" : "approve"
                                return (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{description}</td>
                                        <td>{amount}</td>
                                        <td>{job?.name ?? "N/A"}</td>
                                        <td>{passenger?.name ?? "N/A"}</td>
                                        {/* {
                                            isNotBasicUser
                                            ?
                                            <td>
                                                <button onClick={() => toggleRevenueStatus(id)}>
                                                    {btnText}
                                                </button>
                                            </td>
                                            :
                                            null
                                        } */}
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
                total={totalRevenueCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default RevenueTable;