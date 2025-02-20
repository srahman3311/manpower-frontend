import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, toggleDeleteModal } from "../slices/jobReducer";
import { useFetchJobs } from "../hooks/useFetchJobs";
import styles from "../styles/JobTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const JobTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchJobList } = useFetchJobs();
    const jobState = useSelector((state: RootState) => state.jobState);
    const { searchText, skip, limit, totalJobCount, jobList, newJobInfo } = jobState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchJobList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const jobInAction = jobList.find(agent => agent.id.toString() === id);

        if(!jobInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "jobInAction",
                value: jobInAction
            }));
            dispatch(toggleDeleteModal(jobInAction))
            return;
        }

        dispatch(updateState({
            name: "newJobInfo",
            value: {
                ...newJobInfo,
                name: jobInAction.name,
                visaType: jobInAction.visaType,
                visaName: jobInAction.visaName,
                visaQuantity: jobInAction.visaQuantity.toString(),
                visaUnitPrice: jobInAction.visaUnitPrice.toString()
            }
        }))
      
        navigate(`/jobs/edit/${id}`);

    }, [jobList, dispatch, updateState])

    const navigateToNextPage = useCallback(() => {
        if(totalJobCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalJobCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 7;

    console.log(jobList)

    return (
        <div className={styles.job_table_container}>
            <div className={styles.job_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Visa Name</th>
                            <th>Visa Company</th>
                            <th>Visa Quantity</th>
                            <th>Visa Unit Price</th>
                            <th>Total Price</th>
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
                            jobList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No jobs to show"}
                            />
                            :
                            jobList.map(agent => {
                                const { id, name, visaName, visaQuantity, visaUnitPrice, visaCompany, totalPrice } = agent;
                                return (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{visaName}</td>
                                        <td>{visaCompany.name}</td>
                                        <td>{visaQuantity}</td>
                                        <td>{visaUnitPrice}</td>
                                        <td>{totalPrice}</td>
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
                total={totalJobCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default JobTable;