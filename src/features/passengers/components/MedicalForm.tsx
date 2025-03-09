import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DatePicker from "react-datepicker";
import styles from "../styles/AddEditPassenger.module.css";
import TextInput from "../../../components/inputs/TextInput";

interface MedicalFormProps {
    selectDate: (date: Date | null, options: { group: string, field: string }) => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const MedicalForm: React.FC<MedicalFormProps> = ({ selectDate, handleChange }) => {

    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { medicalInfo } = passengerState;

    return (
        <div className={styles.passenger_form_group}>
            <div className={styles.flex_input}>
                <div className={styles.datepicker}>
                    <label>Date</label>
                    <DatePicker 
                        selected={medicalInfo.date}
                        onChange={(date) => selectDate(date, { group: "medical", field: "date" })}
                        
                    />
                </div>
               <div className={styles.datepicker}>
                    <label>Expiry Date</label>
                    <DatePicker 
                        selected={medicalInfo.expiryDate}
                        onChange={(date) => selectDate(date, { group: "medical", field: "expiryDate" })}
                    />
                </div>
                <TextInput
                    label="Status"
                    name="status"
                    data-type="medical"
                    value={medicalInfo.status}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
    
}

export default MedicalForm;

