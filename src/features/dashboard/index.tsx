import React, { useState } from "react";
import { useFetchUrgentPassengers } from "../passengers/hooks/useFetchUrgentPassengers";
import { getStatusColor } from "./utils/getStatusColor";
import { getDateText } from "../../utils/date-time/dateTime";
import styles from "./index.module.css";
import { Button } from "../../components/buttons/Button";
import { NoDataTR } from "../../components/tables/NoDataTR";

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

    const colSpan = 6;

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
                        {
                            errorMsg
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={errorMsg}
                                style={{
                                    height: "100px"
                                }}
                            />
                            :
                            !loading && totalPassengerCount <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No Data To Show"}
                                style={{
                                    height: "100px"
                                }}
                            />
                            :
                            passengerList.map(passenger => {
                                const { name, visaExpiryDate, status, medical, passport } = passenger;
                                
                                const passportStatusColor = getStatusColor(passport.expiryDate);
                                const visaStatusColor = getStatusColor(visaExpiryDate, status);
                                const medicalStatusColor = getStatusColor(medical.expiryDate, medical.status);

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
            {
                errorMsg || (!loading && totalPassengerCount <= 0)
                ?
                null
                :
                <div className={styles.load_more_btn}>
                    <Button 
                        size="medium" 
                        onClick={loadMorePassengers}
                        disabled={limit >= totalPassengerCount}
                    >
                        Load More
                    </Button>
                </div>
            }
        </div>
    );
    
}

export default Dashboard;

