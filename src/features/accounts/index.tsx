import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterAccountList } from "./slices/accountReducer";
import { deleteAccount } from "../../services/accounts";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import AccountTable from "./components/AccountTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const AccountList: React.FC = () => {

    const dispatch = useDispatch()
    const accountState = useSelector((state: RootState) => state.accountState);
    const { 
        searchText,
        accountList,
        limit,
        isDeleting, 
        accountInAction 
    } = accountState;

    const searchAccounts = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    const deleteAccountInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteAccount(accountInAction?.id);
            const filteredAccountList = accountList.filter(user => user.id !== accountInAction?.id);
            dispatch(filterAccountList(filteredAccountList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteAccount, dispatch, filterAccountList, accountList, accountInAction?.id])

    return (
        <div className={styles.account_list}>
            <div className={styles.search_add}>
                <h2>Accounts</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchAccounts}
                        value={searchText}
                    />
                    <Link className={styles.add_new_account} to="/accounts/add-new">
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
            <AccountTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={accountInAction?.name}
                    deleteItem={deleteAccountInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default AccountList;

