import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { RootState } from "../../../store";
import { 
    updateState
} from "../slices/passengerReducer";
import styles from "../styles/AddEditPassenger.module.css";

const FlightTable: React.FC = () => {

    const dispatch = useDispatch();
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { flights } = passengerState; 

    const removeFlight = (number?: string) => {
        const filteredFlights = flights.filter(item => item.number !== number);
        dispatch(updateState({
            name: "flights",
            value: filteredFlights
        }))
    }

    return (
        <div className={styles.flight_list}>
            <table className={styles.flight_table} >
                <thead>
                    <tr>
                        <th>Airlines Name</th>
                        <th>Flight Number</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Action</th>
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
                                <td>{departureDate?.toDateString()} - {departurePlaceAndTime}</td>
                                <td>{arrivalDate?.toDateString()} - {arrivalPlaceAndTime}</td>
                                <td>
                                    <button
                                        className={styles.remove_schedule} 
                                        onClick={() => removeFlight(number)}
                                    >
                                        <MdDelete 
                                            size={"1.2rem"} 
                                            color="#FFAAA5"
                                        />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default FlightTable;