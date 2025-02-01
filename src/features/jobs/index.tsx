import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterJobList } from "./slices/jobReducer";
import { deleteJob } from "../../services/jobs";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import JobTable from "./components/JobTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";

const JobList: React.FC = () => {

    const dispatch = useDispatch()
    const jobState = useSelector((state: RootState) => state.jobState);
    const { 
        jobList,
        limit,
        isDeleting, 
        jobInAction 
    } = jobState;

    const searchJobs = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    const deleteJobInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deleteJob(jobInAction?.id);
            const filteredJobList = jobList.filter(agent => agent.id !== jobInAction?.id);
            dispatch(filterJobList(filteredJobList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deleteJob, dispatch, filterJobList, jobList, jobInAction?.id])

    return (
        <div className={styles.job_list}>
            <div className={styles.search_add}>
                <h2>Jobs</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchJobs}
                    />
                    <Link className={styles.add_new_job} to="/jobs/add-new">
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
            <JobTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={jobInAction?.name}
                    deleteItem={deleteJobInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default JobList;

