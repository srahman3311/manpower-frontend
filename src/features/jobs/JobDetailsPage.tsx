import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFetchPassengersByJobId } from "../passengers/hooks/useFetchPassengersByJobId";
import { useFetchExpensesByJobId } from "../expenses/hooks/useFetchExpensesByJobId";
import { useFetchRevenuesByJobId } from "../revenues/hooks/useFetchRevenuesByJobId";
import { getJobOverviewData } from "./utils/getJobOverviewData";
import styles from "./styles/JobDetailsPage.module.css"
import JobPassengerTable from "./components/JobPassengerTable";
import ExpenseULList from "../expenses/components/ExpenseULList";
import RevenueULList from "../revenues/components/RevenueULList";

const JobDetailsPage: React.FC = () => {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const { loading, errorMsg, passengerList } = useFetchPassengersByJobId(Number(jobId));
    const { 
        loading: expenseLoading,
        errorMsg: expenseErrorMsg,
        expenseList 
    } = useFetchExpensesByJobId(Number(jobId))
    const { 
        loading: revenueLoading,
        errorMsg: revenueErrorMsg,
        revenueList 
    } = useFetchRevenuesByJobId(Number(jobId))
    const jobState = useSelector((state: RootState) => state.jobState);
    const { jobInAction } = jobState;

    useEffect(() => {
      if(!jobInAction) {
        navigate("/jobs")
      }
    }, [jobInAction])

    const data = useMemo(() => {
        return getJobOverviewData(jobInAction, passengerList)   
    }, [jobInAction, passengerList]);

    if(errorMsg) return <div>{errorMsg}</div>
    
    return (
        <div className={styles.job_details_page}>
            <h2><span>{jobInAction?.name}</span> Summary</h2>
            <div className={styles.job_overview}>
                {data.map(item => {
                    return (
                        <div   
                            key={item.title}
                            className={styles.jov_overview_item_info}
                        >
                            <p>{item.title}</p>
                            <p>{item.content}</p>
                        </div>
                    );
                })}
            </div>
            {
                loading
                ?
                <div>loading....</div>
                :
                passengerList.length <= 0
                ?
                <div>No passenger has been enlisted to this job</div>
                :
                <>
                    <h2>Passenger List</h2>
                    <JobPassengerTable
                        passengerList={passengerList} 
                    /> 
                </>
            }
            <h2>Expenses And Revenues</h2>
            <div className={styles.job_expense_revenue}>
                <div className={styles.expenses}>
                    <h2>Expenses</h2>
                    <ExpenseULList 
                        loading={expenseLoading}
                        errorMsg={expenseErrorMsg}
                        expenseList={expenseList}
                    />
                </div>
                <div className={styles.revenues}>
                    <h2>Revenues</h2>
                    <RevenueULList 
                        loading={revenueLoading}
                        errorMsg={revenueErrorMsg}
                        revenueList={revenueList}
                    />
                </div>
            </div>
            
        </div>
    );
    
}

export default JobDetailsPage;

