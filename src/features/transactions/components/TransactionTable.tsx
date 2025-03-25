import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, toggleDeleteModal } from "../slices/transactionReducer";
import { useFetchTransactions } from "../hooks/useFetchTransactions";
import styles from "../styles/TransactionTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const TransactionTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchTransactionList } = useFetchTransactions();
    const transactionState = useSelector((state: RootState) => state.transactionState);
    const { 
        searchText, 
        skip, 
        limit, 
        totalTransactionCount, 
        transactionList, 
        newTransactionInfo 
    } = transactionState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchTransactionList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const transactionInAction = transactionList.find(transaction => transaction.id.toString() === id);

        if(!transactionInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "transactionInAction",
                value: transactionInAction
            }));
            dispatch(toggleDeleteModal(transactionInAction))
            return;
        }

        dispatch(updateState({
            name: "newTransactionInfo",
            value: {
                ...newTransactionInfo,
                name: transactionInAction.name,
                description: transactionInAction.description ?? "",
                amount: transactionInAction.amount.toString()
            }
        }));

        const { 
            debitedFromAccount,
            debitedFromUser,
            creditedToAccount,
            creditedToUser
        } = transactionInAction;

        if(debitedFromAccount) {
            dispatch(updateState({
                name: "selectedDebitedFromItem",
                value: {
                    itemId: debitedFromAccount.id,
                    type: "account",
                    title: debitedFromAccount.name,
                    id: `${debitedFromAccount.id}-${debitedFromAccount.name}`
                }
            }))
        } 
        
        if(debitedFromUser) {
            dispatch(updateState({
                name: "selectedDebitedFromItem",
                value: {
                    itemId: debitedFromUser.id,
                    type: "user",
                    title: debitedFromUser.firstName,
                    id: `${debitedFromUser.id}-${debitedFromUser.firstName}`
                }
            }))
        }

        if(creditedToAccount) {
            dispatch(updateState({
                name: "selectedCreditedToItem",
                value: {
                    itemId: creditedToAccount.id,
                    type: "account",
                    title: creditedToAccount.name,
                    id: `${creditedToAccount.id}-${creditedToAccount.name}`
                }
            }))
        } 
        
        if(creditedToUser) {
            dispatch(updateState({
                name: "selectedCreditedToItem",
                value: {
                    itemId: creditedToUser.id,
                    type: "user",
                    title: creditedToUser.firstName,
                    id: `${creditedToUser.id}-${creditedToUser.firstName}`
                }
            }))
        }
 
        navigate(`/transactions/edit/${id}`);

    }, [transactionList, dispatch, updateState])

    const navigateToNextPage = useCallback(() => {
        if(totalTransactionCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalTransactionCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 7;

    return (
        <div className={styles.transaction_table_container}>
            <div className={styles.transaction_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Amount</th>
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
                            transactionList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No transaction data to show"}
                            />
                            :
                            transactionList.map(transaction => {
                                const { id, name, description, amount } = transaction;
                             
                                return (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{description}</td>
                                        <td>{amount}</td>
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
                total={totalTransactionCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default TransactionTable;