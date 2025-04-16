import styles from "../styles/JobTable.module.css";
import { Passenger } from "../../passengers/types/Passenger";

interface JobPassengerTableProps {
    passengerList: Passenger[];
}

const JobPassengerTable: React.FC<JobPassengerTableProps> = ({ passengerList }) => {

    return (
        <div className={styles.job_passenger_table_container}>
            <div className={styles.job_passenger_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Agent</th>
                            <th>Passport</th>
                            <th>Medical</th>
                            {/* Visa application is called tasheer or mofa */}
                            <th>Tasheer/Mofa</th> 
                            <th>BMET Finger</th>
                            <th>Visa</th>
                            <th>Flight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengerList.map(passenger => {
                            const { 
                                id, 
                                name, 
                                agent,
                                medical, 
                                passport, 
                                visaNumber,
                                visaApplicationDate,
                                visaBMETFingerDate,
                                flights 
                            } = passenger;
                            const isFlightDone = flights.some(flight => flight.number)
                            return (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td>{agent.firstName}</td>
                                    <td>{passport.number}</td>
                                    <td>{medical.date ? "Done" : "Not Done"}</td>
                                    <td>{visaApplicationDate ? "Applied" : "Not Applied"}</td>
                                    <td>{visaBMETFingerDate ? "Done" : "Not Done"}</td>
                                    <td>{visaNumber ? "Issued" : "Not Issued"}</td>
                                    <td>{isFlightDone ? "Done" : "Not Done"}</td>
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