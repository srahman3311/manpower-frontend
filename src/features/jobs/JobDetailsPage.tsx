import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFetchPassengersByJobId } from "../passengers/hooks/useFetchPassengersByJobId";
import { getJobOverviewData } from "./utils/getJobOverviewData";
import styles from "./styles/JobDetailsPage.module.css"
import JobPassengerTable from "./components/JobPassengerTable";

const JobDetailsPage: React.FC = () => {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const { loading, errorMsg, passengerList } = useFetchPassengersByJobId(Number(jobId))
    const jobState = useSelector((state: RootState) => state.jobState);
    const { jobInAction } = jobState;

    useEffect(() => {
      if(!jobInAction) {
        navigate("/jobs")
      }
    }, [jobInAction])

    const data = useMemo(() => {
        return getJobOverviewData(jobInAction, passengerList)   
    }, [jobInAction, passengerList])

    return (
        <div className={styles.job_details_page}>
            <h2>Summary of {jobInAction?.name}</h2>
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
            <h2>Passenger List</h2>
            <JobPassengerTable
                loading={loading}
                errorMsg={errorMsg}
                passengerList={passengerList} 
            /> 
        </div>
    );
    
}

export default JobDetailsPage;

