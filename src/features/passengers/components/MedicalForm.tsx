import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DatePicker from "react-datepicker";
import styles from "../styles/AddEditPassenger.module.css"
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import { PassengerStatus } from "../types/PassengerState";

interface MedicalFormProps {
    selectDate: (date: Date | null, options: { group: string, field: string }) => void
    handleDropdownClick: (item: any) => void
}

const MedicalForm: React.FC<MedicalFormProps> = ({ selectDate, handleDropdownClick }) => {

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
                <DropdownList 
                    label={"Status"}
                    data={[
                        { id: 1, medical: true, status: PassengerStatus.Processing },
                        { id: 2, medical: true, status: PassengerStatus.Completed }
                    ]}
                    nameKey="status"
                    selectedValue={medicalInfo.status}
                    onClick={handleDropdownClick}
                />
            </div>
        </div>
    );
    
}

export default MedicalForm;

