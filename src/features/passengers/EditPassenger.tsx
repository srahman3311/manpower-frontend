import styles from "./styles/AddEditPassenger.module.css"
import PassengerForm from "./components/PassengerForm";

const EditPassenger: React.FC = () => {

    return (
        <div className={styles.add_edit_passenger}>
            <h2>Edit Passenger</h2>
            <PassengerForm />
        </div>
    );
    
}

export default EditPassenger;

