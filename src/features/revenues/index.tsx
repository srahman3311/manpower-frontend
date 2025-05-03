import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterRevenueList } from "./slices/revenueReducer";
import { deleteRevenue } from "../../services/revenues";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import RevenueTable from "./components/RevenueTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const RevenueList: React.FC = () => {

    const dispatch = useDispatch()
    const revenueState = useSelector((state: RootState) => state.revenueState);
    const { 
        searchText,
        revenueList,
        limit,
        isDeleting, 
        revenueInAction 
    } = revenueState;

    const searchRevenues = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    const deleteRevenueInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteRevenue(revenueInAction?.id);
            const filteredRevenueList = revenueList.filter(user => user.id !== revenueInAction?.id);
            dispatch(filterRevenueList(filteredRevenueList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteRevenue, dispatch, filterRevenueList, revenueList, revenueInAction?.id])

    return (
        <div className={styles.revenue_list}>
            <div className={styles.search_add}>
                <h2>Revenues</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchRevenues}
                        value={searchText}
                    />
                    <Link className={styles.add_new_revenue} to="/revenues/add-new">
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
            <RevenueTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={revenueInAction?.name}
                    deleteItem={deleteRevenueInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default RevenueList;

