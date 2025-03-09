import React, { useState } from "react";
import { useFetchUrgentPassengers } from "../passengers/hooks/useFetchUrgentPassengers";
import { getStatusColor } from "./utils/getStatusColor";
import { getDateText } from "../../utils/date-time/dateTime";
import styles from "./index.module.css";
import { Button } from "../../components/buttons/Button";

const Dashboard: React.FC = () => {

    const [limit, setLimit] = useState<number>(5);
    const { 
        loading, 
        errorMsg, 
        passengerList, 
        totalPassengerCount 
    } = useFetchUrgentPassengers(limit);

    const loadMorePassengers = () => {
        setLimit(limit + 5)
    }

    if(loading) return null;
    if(errorMsg) return <div>{errorMsg}</div>

    return (
        <div className={styles.dashboard}>
            <h2>Following passengers need urgent actions</h2>
            <div className={styles.passenger_urgent_table}>
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Passport Number</th>
                            <th>Job</th>
                            <th>Visa Status</th>
                            <th>Medical Status</th>
                            <th>Passport Status</th>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {passengerList.map(passenger => {
                            const { name, visaExpiryDate, status, medical, passport } = passenger;
                            
                            const passportStatusColor = getStatusColor("passport", passport.expiryDate);
                            const visaStatusColor = getStatusColor("visa", visaExpiryDate, status);
                            const medicalStatusColor = getStatusColor("medical", medical.expiryDate, medical.status);

                            const visaExpiresOn = visaExpiryDate ? getDateText(new Date(visaExpiryDate)) : "TBA";
                            const medicalExpiresOn = medical.expiryDate ? getDateText(new Date(medical.expiryDate)) : "TBA";
                            const passportExpiresOn = passport.expiryDate ? getDateText(new Date(passport.expiryDate)) : "TBA";
                            return (
                                <React.Fragment key={passenger.id}>
                                    <tr className={styles.data_tr}>
                                        <td>{name}</td>
                                        <td>{passport.number ?? "N/A"}</td>
                                        <td>{passenger.job?.name ?? "N/A"}</td>
                                        <td>
                                            <div className={styles.status_td_div}>
                                                <span className={styles[visaStatusColor]}></span>
                                                <span>{visaExpiresOn}</span>
                                            </div>
                                        </td>
                                        <td className={styles.status_td}>
                                            <div className={styles.status_td_div}>
                                                <span className={styles[medicalStatusColor]}></span>
                                                <span>{medicalExpiresOn}</span>
                                            </div>
                                        </td>
                                        <td className={styles.status_td}>
                                            <div className={styles.status_td_div}>
                                                <span className={styles[passportStatusColor]}></span>
                                                <span>{passportExpiresOn}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.load_more_btn}>
                <Button 
                    size="medium" 
                    onClick={loadMorePassengers}
                    disabled={limit >= totalPassengerCount}
                >
                    Load More
                </Button>
            </div>
        </div>
    );
    
}

export default Dashboard;

