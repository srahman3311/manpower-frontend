import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterUserList } from "./slices/userReducer";
import { deleteUser } from "../../services/users";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import UserTable from "./components/UserTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const UserList: React.FC = () => {

    const dispatch = useDispatch()
    const userState = useSelector((state: RootState) => state.userState);
    const { 
        userList,
        limit,
        isDeleting, 
        userInAction 
    } = userState;

    const searchUsers = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    const deleteUserInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteUser(userInAction?.id);
            const filteredUserList = userList.filter(user => user.id !== userInAction?.id);
            dispatch(filterUserList(filteredUserList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteUser, dispatch, filterUserList, userList, userInAction?.id])

    return (
        <div className={styles.user_list}>
            <div className={styles.search_add}>
                <h2>Users</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchUsers}
                    />
                    <Link className={styles.add_new_user} to="/users/add-new">
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
            <UserTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={userInAction?.firstName}
                    deleteItem={deleteUserInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default UserList;

