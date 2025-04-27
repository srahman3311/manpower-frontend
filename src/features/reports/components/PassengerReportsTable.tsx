import styles from "../styles/reports.module.css";
import { Passenger } from "../../passengers/types/Passenger";
import { NoDataTR } from "../../../components/tables/NoDataTR";

interface JobPassengerTableProps {
    loading: boolean
    errorMsg?: string
    passengerList: Passenger[]
}

const PassengerReportsTable: React.FC<JobPassengerTableProps> = ({ 
    loading,
    errorMsg,
    passengerList 
}) => {

    const colSpan = 10;

    return (
        <div className={styles.passenger_reports_table_container}>
            <div className={styles.passenger_reports_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Agent</th>
                            <th>Job</th>
                            <th>Passport</th>
                            <th>Medical</th>
                            {/* Visa application is called tasheer or mofa */}
                            <th>Tasheer/Mofa</th> 
                            <th>Tasheer/Mofa Finger</th> 
                            <th>BMET Finger</th>
                            <th>Visa</th>
                            <th>Flight</th>
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
                            passengerList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No passenger data to show"}
                            />
                            :
                            passengerList.map(passenger => {
                                const { 
                                    id, 
                                    name, 
                                    agent,
                                    job,
                                    medical, 
                                    passport, 
                                    visaNumber,
                                    visaApplicationDate,
                                    visaApplicationFingerDate,
                                    visaBMETFingerDate,
                                    flights 
                                } = passenger;
                                const isFlightDone = flights.some(flight => flight.number)
                                return (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{agent.firstName}</td>
                                        <td>{job?.name}</td>
                                        <td>{passport.number}</td>
                                        <td>{medical.date ? "Done" : ""}</td>
                                        <td>{visaApplicationDate ? "Applied" : "-"}</td>
                                        <td>{visaApplicationFingerDate ? "Done" : "-"}</td>
                                        <td>{visaBMETFingerDate ? "Done" : "-"}</td>
                                        <td>{visaNumber ? "Issued" : "-"}</td>
                                        <td>{isFlightDone ? "Done" : "-"}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default PassengerReportsTable;