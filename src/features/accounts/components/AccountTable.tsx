import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, toggleDeleteModal } from "../slices/accountReducer";
import { useFetchAccounts } from "../hooks/useFetchAccounts";
import styles from "../styles/AccountTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const AccountTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchAccountList } = useFetchAccounts();
    const accountState = useSelector((state: RootState) => state.accountState);
    const { searchText, skip, limit, totalAccountCount, accountList } = accountState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchAccountList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const accountInAction = accountList.find(user => user.id.toString() === id);

        if(!accountInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "accountInAction",
                value: accountInAction
            }));
            dispatch(toggleDeleteModal(accountInAction))
            return;
        }

        dispatch(updateState({
            name: "newAccountInfo",
            value: {
                name: accountInAction.name,
                bankName: accountInAction.bankName ?? "",
                bankBranchName: accountInAction.bankBranchName ?? "",
                bankAccountHolderName: accountInAction.bankAccountHolderName ?? "",
                bankAccountNumber: accountInAction.bankAccountNumber ?? "",
                balance: accountInAction.balance.toString()
            }
        }));
      
        navigate(`/accounts/edit/${id}`);

    }, [accountList, dispatch, updateState, toggleDeleteModal, navigate])

    const navigateToNextPage = useCallback(() => {
        if(totalAccountCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalAccountCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 6;

    return (
        <div className={styles.account_table_container}>
            <div className={styles.account_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Balance</th>
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
                            accountList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No Accounts To Show"}
                            />
                            :
                            accountList.map(user => {
                                const { id, name, bankName, bankAccountNumber, balance } = user;
                                return (
                                    <tr key={id}>

                                        <td>{name}</td>
                                        <td>{bankName}</td>
                                        <td>{bankAccountNumber}</td>
                                        <td>{balance}</td>
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
                total={totalAccountCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default AccountTable;