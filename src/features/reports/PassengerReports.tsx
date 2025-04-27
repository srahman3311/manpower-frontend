import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { RootState } from "../../store";
import { updateState } from "./slices/reportsReducer";
import { useFetchJobsForReports } from "../jobs/hooks/useFetchJobsForReports";
import { useFetchAgentsForReports } from "../agents/hooks/useFetchAgentsForReports";
import { fetchPassengerReports } from "../../services/passengers";
import { getPassengerCSVContent } from "../../utils/export-to-excel/getPassengerCSVContent";
import { downloadCSV } from "../../utils/export-to-excel/downloadCSV";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/reports.module.css";
import { DropdownList } from "../../components/dropdown-list/DropdownList";
import { Button } from "../../components/buttons/Button";
import PassengerReportsTable from "./components/PassengerReportsTable";

const PassengerReports: React.FC = () => {

    const dispatch = useDispatch();
    const reportsSate = useSelector((state: RootState) => state.reportsState);
    const { 
        selectedAgent, 
        selectedJob,
        startDate,
        endDate,
        isMedicalDone,
        isVisaIssued,
        isBMETFingerDone,
        isVisaApplicationFingerDone,
        isFlightDone,
        passengerList 
    } = reportsSate;
    const { errorMsg: agentFetchErrorMsg, agentList } = useFetchAgentsForReports();
    const { errorMsg: jobFetchErrorMsg, jobList } = useFetchJobsForReports();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>();

    const selectDate = (date: Date | null, name: string) => {
        dispatch(updateState({
            name,
            value: date
        }))
    }

    const handleDropdownClick = useCallback((item: any) => {

        if(item.hasOwnProperty("firstName")) {
            dispatch(updateState({
                name: "selectedAgent",
                value: item.id === "agent" ? null : item
            }));
            return;
        }

        dispatch(updateState({
            name: "selectedJob",
            value: item.id === "job" ? null : item
        }));

    }, [
        dispatch, 
        updateState
    ])

    const handleButtonClick = (name: string) => {
        dispatch(updateState({
            name,
            value: !(reportsSate as any)[name]
        }))
    }

    const fetchPassenger = async() => {

        let params = `startDate=${startDate?.toISOString().split('T')[0]}&endDate=${endDate?.toISOString().split('T')[0]}`

        if(selectedJob) {
            params += `&jobId=${selectedJob.id}`
        }

        if(selectedAgent) {
            params += `&agentId=${selectedAgent.id}`
        }

        for(const [key, value] of Object.entries(reportsSate)) {
            if(typeof value === 'boolean' && value) {
                params += `&${key}=${value}`
            }
        }

        setLoading(true);
        setErrorMsg(undefined)

        try {

            const response = await fetchPassengerReports(params);
            dispatch(updateState({
                name: "passengerList",
                value: response.passengers
            }))

        } catch(error) {
            const { message } = handleApiError(error);
            setErrorMsg(message)
        } finally {
            setLoading(false)
        }
       
    }

    const exportToCSV = () => {
        let csvContent = getPassengerCSVContent(passengerList);
        downloadCSV(csvContent);
    };

    if(agentFetchErrorMsg) return <div>{agentFetchErrorMsg}</div>
    if(jobFetchErrorMsg) return <div>{jobFetchErrorMsg}</div>
    
    return (
        <div className={styles.reports}>
            <h2>Passenger Reports</h2>
            <div className={styles.main_filters}>
                <div className={styles.dropdown_wrapper}>
                    <DropdownList 
                        label={"Agent"}
                        data={
                            [
                                { id: "agent", firstName: "Select Agent" },
                                ...agentList
                            ]
                        }
                        nameKey="firstName"
                        selectedValue={selectedAgent?.firstName ?? "Select Agent"}
                        onClick={handleDropdownClick}
                    />
                </div>
                <div className={styles.dropdown_wrapper}>
                    <DropdownList 
                        label={"Job"}
                        data={
                            [
                                { id: "job", name: "Select Job" },
                                ...jobList
                            ]
                        }
                        nameKey="name"
                        selectedValue={selectedJob?.name ?? "Select Job"}
                        onClick={handleDropdownClick}
                    />
                </div>
                <div className={styles.datepicker}>
                    <label>Start Date</label>
                    <DatePicker 
                        selected={startDate}
                        onChange={(date) => selectDate(date, "startDate")}
                        popperClassName="custom-datepicker-popper"
                    />
                </div>
                <div className={styles.datepicker}>
                    <label>End Date</label>
                    <DatePicker 
                        selected={endDate}
                        onChange={(date) => selectDate(date, "endDate")}
                        popperClassName="custom-datepicker-popper"
                    />
                </div>
            </div>
            <div className={styles.button_list}>
                <Button
                    variant={isMedicalDone ? "primary" : "outline"}
                    size="small"
                    onClick={() => handleButtonClick("isMedicalDone")}
                
                >
                    Medical
                </Button>
                <Button
                    variant={isVisaApplicationFingerDone ? "primary" : "outline"}
                    size="small"
                    onClick={() => handleButtonClick("isVisaApplicationFingerDone")}
                
                >
                    Tasheer
                </Button>
                <Button
                    variant={isBMETFingerDone ? "primary" : "outline"}
                    size="small"
                    onClick={() => handleButtonClick("isBMETFingerDone")}
                
                >
                    BMET
                </Button>
                <Button
                    variant={isVisaIssued ? "primary" : "outline"}
                    size="small"
                    onClick={() => handleButtonClick("isVisaIssued")}
                
                >
                    Visa
                </Button>
                <Button
                    variant={isFlightDone ? "primary" : "outline"}
                    size="small"
                    onClick={() => handleButtonClick("isFlightDone")}
                
                >
                    Flight
                </Button>
            </div>
            <div className={styles.fetch_button}>
                <Button
                    onClick={fetchPassenger}
                    disabled={loading}
                >
                    Get Reports
                </Button>
            </div>
            <div className={styles.export_buttons}>
                <Button
                    variant="action"
                    onClick={exportToCSV}
                >
                    Export To Excel
                </Button>
            </div>
            <PassengerReportsTable 
                loading={loading}
                errorMsg={errorMsg}
                passengerList={passengerList}
            />
        </div>
    );
    
}

export default PassengerReports;

