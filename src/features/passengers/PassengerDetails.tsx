import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFetchExpensesByPassengerId } from "../expenses/hooks/useFetchExpensesByPassengerId";
import { useFetchRevenuesByPassengerId } from "../revenues/hooks/useFetchRevenuesByPassengerId";
import { getPassengerGeneralData } from "./utils/getPassengerGeneralData";
import { getPassengerMedicalPassportData } from "./utils/getPassengerMedicalPassportData";
import { getPassengerVisaFlightData } from "./utils/getPassengerVisaFlightData";
import styles from "./styles/PassengerDetails.module.css";
import PassengerItemDetails from "./components/PassengerItemDetails";
import FlightDetails from "./components/FlightDetails";
import ExpenseULList from "../expenses/components/ExpenseULList";
import RevenueULList from "../revenues/components/RevenueULList";

const PassengerDetails: React.FC = () => {

    const { passengerId } = useParams();
    const navigate = useNavigate()
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { passengerInAction } = passengerState;

    const { 
        loading: expenseLoading,
        errorMsg: expenseErrorMsg,
        expenseList 
    } = useFetchExpensesByPassengerId(Number(passengerId));
    const {
        loading: revenueLoading,
        errorMsg: revenueErrorMsg, 
        revenueList 
    } = useFetchRevenuesByPassengerId(Number(passengerId));

    // Redirect to passengers on full page refresh. Because not making api call to fetch passenger
    useEffect(() => {
        if(!passengerInAction) {
        navigate("/passengers")
        }
    }, [passengerInAction])

    const generalData = useMemo(() => {
        return getPassengerGeneralData(passengerInAction);
    }, [passengerInAction])
    const medicalPassportData = useMemo(() => {
        return getPassengerMedicalPassportData(passengerInAction);
    }, [passengerInAction])
    const visaFlightData = useMemo(() => {
        return getPassengerVisaFlightData(passengerInAction);
    }, [passengerInAction])

    return (
        <div className={styles.passenger_details}>
            <h2 className={styles.header}>Passenger Details</h2>
            <div className={styles.passenger_info}>
                <div className={styles.general}>
                    <h3>General</h3>
                    <PassengerItemDetails 
                        data={generalData}
                    />
                </div>
                <div className={styles.general}>
                    <h3>Visa And Flight</h3>
                    <PassengerItemDetails 
                        data={visaFlightData}
                    />
                </div>
                <div className={styles.general}>
                    <h3>Passport And Medical</h3>
                    <PassengerItemDetails 
                        data={medicalPassportData}
                    />
                </div>
            </div>
            {
                (passengerInAction?.flights.length ?? 0) > 0
                ?
                <div className={styles.passenger_flight_info}>
                    <h3>Flight Details</h3>
                    <FlightDetails 
                        flights={passengerInAction?.flights ?? []}
                    />
                </div>
                :
                null
            }
            <div className={styles.passenger_expense_revenue}>
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

export default PassengerDetails;

