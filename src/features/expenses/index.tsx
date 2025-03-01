import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterExpenseList } from "./slices/expenseReducer";
import { deleteExpense } from "../../services/expenses";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import ExpenseTable from "./components/ExpenseTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const ExpenseList: React.FC = () => {

    const dispatch = useDispatch()
    const expenseState = useSelector((state: RootState) => state.expenseState);
    const { 
        expenseList,
        limit,
        isDeleting, 
        expenseInAction 
    } = expenseState;

    const searchExpenses = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    const deleteExpenseInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteExpense(expenseInAction?.id);
            const filteredExpenseList = expenseList.filter(user => user.id !== expenseInAction?.id);
            dispatch(filterExpenseList(filteredExpenseList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteExpense, dispatch, filterExpenseList, expenseList, expenseInAction?.id])

    return (
        <div className={styles.expense_list}>
            <div className={styles.search_add}>
                <h2>Expenses</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchExpenses}
                    />
                    <Link className={styles.add_new_expense} to="/expenses/add-new">
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
            <ExpenseTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={expenseInAction?.name}
                    deleteItem={deleteExpenseInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default ExpenseList;

