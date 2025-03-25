import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterTransactionList } from "./slices/transactionReducer";
import { deleteTransaction } from "../../services/transactions";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import TransactionTable from "./components/TransactionTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const TransactionList: React.FC = () => {

    const dispatch = useDispatch()
    const transactionState = useSelector((state: RootState) => state.transactionState);
    const { 
        transactionList,
        limit,
        isDeleting, 
        transactionInAction 
    } = transactionState;

    const searchTransactions = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    const deleteTransactionInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteTransaction(transactionInAction?.id);
            const filteredTransactionList = transactionList.filter(user => user.id !== transactionInAction?.id);
            dispatch(filterTransactionList(filteredTransactionList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteTransaction, dispatch, filterTransactionList, transactionList, transactionInAction?.id])

    return (
        <div className={styles.transaction_list}>
            <div className={styles.search_add}>
                <h2>Transactions</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchTransactions}
                    />
                    <Link className={styles.add_new_transaction} to="/transactions/add-new">
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
            <TransactionTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={transactionInAction?.name}
                    deleteItem={deleteTransactionInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default TransactionList;

