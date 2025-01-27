import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterCompanyList } from "./slices/companyReducer";
import { deleteCompany } from "../../services/companies";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import CompanyTable from "./components/CompanyTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const CompanyList: React.FC = () => {

    const dispatch = useDispatch()
    const companyState = useSelector((state: RootState) => state.companyState);
    const { 
        companyList,
        limit,
        isDeleting, 
        companyInAction 
    } = companyState;

    const searchCompanies = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateState({
            name: "searchText",
            value: event.target.value
        }))
    }, [dispatch, updateState])   

    const closeDeleteModal = () => {
        dispatch(toggleDeleteModal(null))
    }

    const handleLimitChange = (item: { _id: number, limit: number }) => {
        dispatch(updateState({
            name: "limit",
            value: item.limit
        }))
    }

    const deleteCompanyInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteCompany(companyInAction?.id);
            const filteredCompanyList = companyList.filter(user => user.id !== companyInAction?.id);
            dispatch(filterCompanyList(filteredCompanyList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteCompany, dispatch, filterCompanyList, companyList, companyInAction?.id])

    return (
        <div className={styles.company_list}>
            <div className={styles.search_add}>
                <h2>Companies</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchCompanies}
                    />
                    <Link className={styles.add_new_company} to="/companies/add-new">
                        <IoMdAdd 
                            size={"2rem"}
                        />
                    </Link>
                </div>
                
                <div className={styles.limit_dropdown}>
                    <DropdownList 
                        data={[
                            { _id: 1, limit: 10 },
                            { _id: 2, limit: 20 },
                            { _id: 3, limit: 50 }
                        ]}
                        nameKey="limit"
                        selectedValue={limit}
                        onClick={handleLimitChange}
                    />
                </div>
            </div>
            <CompanyTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={companyInAction?.name}
                    deleteItem={deleteCompanyInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default CompanyList;

