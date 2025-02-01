import styles from "./styles/AddEditPassenger.module.css"
import PassengerForm from "./components/PassengerForm";

const AddPassenger: React.FC = () => {

    return (
        <div className={styles.add_edit_passenger}>
            <h2>Add Passenger</h2>
            <PassengerForm />
        </div>
    );
    
}

export default AddPassenger;

