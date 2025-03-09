import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { NewPassportInfo } from "../types/PassengerState"
import DatePicker from "react-datepicker";
import styles from "../styles/AddEditPassenger.module.css";
import TextInput from "../../../components/inputs/TextInput";

interface PassengerPassportFormProps {
    selectDate: (date: Date | null, options: { group: string, field: string }) => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PassportForm: React.FC<PassengerPassportFormProps> = ({ selectDate, handleChange }) => {

    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { passportInfo } = passengerState;

    return (
        <div className={styles.passenger_form_group}>
            <div className={styles.flex_input}>
                <TextInput
                    label="Number"
                    name="number"
                    data-type="passport"
                    value={passportInfo.number}
                    onChange={handleChange}
                />
                
                <TextInput
                    label="Issuing Institute"
                    name="issuingInstitute"
                    data-type="passport"
                    value={passportInfo.issuingInstitute}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.flex_input}>
                <div className={styles.datepicker}>
                    <label>Date</label>
                    <DatePicker 
                        selected={passportInfo.date}
                        onChange={(date) => selectDate(date, { group: "passport", field: "date" })}
                        
                    />
                </div>
               <div className={styles.datepicker}>
                    <label>Expiry Date</label>
                    <DatePicker 
                        selected={passportInfo.expiryDate}
                        onChange={(date) => selectDate(date, { group: "passport", field: "expiryDate" })}
                        
                    />
                </div>
            </div>
        </div>
    );
    
}

export default PassportForm;

