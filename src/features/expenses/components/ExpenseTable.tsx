import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { UserRole } from "../../users/types/User";
import { updateState, toggleDeleteModal } from "../slices/expenseReducer";
import { toggleExpenseApprovalStatus } from "../../../services/expenses";
import { useFetchExpenses } from "../hooks/useFetchExpenses";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import styles from "../styles/ExpenseTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const ExpenseTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchExpenseList } = useFetchExpenses();
    const authState = useSelector((state: RootState) => state.authState);
    const expenseState = useSelector((state: RootState) => state.expenseState);
    const { user } = authState;
    const { searchText, skip, limit, totalExpenseCount, expenseList, newExpenseInfo } = expenseState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchExpenseList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const expenseInAction = expenseList.find(expense => expense.id.toString() === id);

        if(!expenseInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "expenseInAction",
                value: expenseInAction
            }));
            dispatch(toggleDeleteModal(expenseInAction))
            return;
        }

        dispatch(updateState({
            name: "newExpenseInfo",
            value: {
                ...newExpenseInfo,
                name: expenseInAction.name,
                description: expenseInAction.description ?? "",
                amount: expenseInAction.amount.toString()
            }
        }))

        dispatch(updateState({
            name: "selectedJob",
            value: expenseInAction.job
        }));

        dispatch(updateState({
            name: "selectedPassenger",
            value: expenseInAction.passenger
        }));

        dispatch(updateState({
            name: "selectedAccount",
            value: expenseInAction.debitedFromAccount
        }));
 
        navigate(`/expenses/edit/${id}`);

    }, [expenseList, dispatch, updateState])

    const toggleExpenseStatus = async (expenseId: number) => {
        try {
            const updatedExpense = await toggleExpenseApprovalStatus(expenseId);
            const newExpenseList = expenseList.map(expense => {
                if(updatedExpense.id === expense.id) return updatedExpense;
                return expense;
            });

            dispatch(updateState({
                name: "expenseList",
                value: newExpenseList
            }));

        } catch(error) {
            console.log(error);
            const { message } = handleApiError(error);
            alert(message);
        }
    }

    const navigateToNextPage = useCallback(() => {
        if(totalExpenseCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalExpenseCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 7;

    const isNotBasicUser = useMemo(() => user?.roles.some(role => role.name !== UserRole.Basic), [user?.roles.length]);

    const role = user?.roles[0] ? user?.roles[0].name : "admin";
    let statusKey = role + "ApprovalStatus";

    return (
        <div className={styles.expense_table_container}>
            <div className={styles.expense_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Job</th>
                            <th>Passenger</th>
                            {
                                isNotBasicUser
                                ?
                                <th>Action</th>
                                :
                                null
                            }
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
                            expenseList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No expense data to show"}
                            />
                            :
                            expenseList.map(expense => {
                                const { id, name, description, amount, job, passenger } = expense;
                                const btnText = (expense as any)[statusKey] === "approved" ? "reject" : "approve"
                                return (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{description}</td>
                                        <td>{amount}</td>
                                        <td>{job?.name ?? "N/A"}</td>
                                        <td>{passenger?.name ?? "N/A"}</td>
                                        {
                                            isNotBasicUser
                                            ?
                                            <td>
                                                <button onClick={() => toggleExpenseStatus(id)}>
                                                    {btnText}
                                                </button>
                                            </td>
                                            :
                                            null
                                        }
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
                total={totalExpenseCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default ExpenseTable;