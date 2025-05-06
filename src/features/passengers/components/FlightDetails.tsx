import { Flight } from "../types/Flight";
import styles from "../styles/PassengerDetails.module.css";

interface FlightDetailsProps {
    flights: Flight[]
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flights }) => {

    return (
        <div className={styles.flight_list}>
            <table className={styles.flight_table} >
                <thead>
                    <tr>
                        <th>Airlines Name</th>
                        <th>Flight Number</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(flight => {

                        const { 
                            number, 
                            airlinesName, 
                            departureDate, 
                            departurePlaceAndTime,
                            arrivalDate, 
                            arrivalPlaceAndTime 
                        } = flight;

                        return (
                            <tr key={number}>
                                <td>{airlinesName}</td>
                                <td>{number}</td>
                                <td>
                                    {departureDate ? new Date(departureDate).toDateString() : ""} - {departurePlaceAndTime}
                                </td>
                                <td>
                                    {arrivalDate ? new Date(arrivalDate)?.toDateString() : ""} - {arrivalPlaceAndTime}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default FlightDetails;