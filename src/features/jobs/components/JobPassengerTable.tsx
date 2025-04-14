import styles from "../styles/JobTable.module.css";
import { NoDataTR } from "../../../components/tables/NoDataTR";
import { Passenger } from "../../passengers/types/Passenger";

interface JobPassengerTableProps {
    loading: boolean
    errorMsg: string | null;
    passengerList: Passenger[];
}

const JobPassengerTable: React.FC<JobPassengerTableProps> = ({ loading, errorMsg, passengerList }) => {

    const colSpan = 6;

    return (
        <div className={styles.job_passenger_table_container}>
            <div className={styles.job_passenger_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Passport</th>
                            <th>Phone</th>
                            <th>Medical</th>
                            <th>Visa Application Status</th>
                            <th>Visa Status</th>
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
                                content={"No passengers enlisted yet"}
                            />
                            :
                            passengerList.map(agent => {
                                const { 
                                    id, 
                                    name, 
                                    phone, 
                                    medical, 
                                    passport, 
                                    visaNumber,
                                    visaApplicationDate 
                                } = agent;
                                return (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{passport.number}</td>
                                        <td>{phone}</td>
                                        <td>{medical.date ? "Done" : "Not Done"}</td>
                                        <td>{visaApplicationDate ? "Applied" : "Not Applied"}</td>
                                        <td>{visaNumber ? "Issued" : "Not Issued"}</td>
                                    </tr>
                                );

                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default JobPassengerTable;