import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { RootState } from "../../../store";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";
import { 
    updateState, 
    addNewPassengerInfo,
    addNewAddressInfo,
    addNewMedicalInfo,
    addNewPassportInfo 
} from "../slices/passengerReducer";
import { createPassenger, editPassenger } from "../../../services/passengers";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { getPassengerRequestBody } from "../utils/getPassengerRequestBody";
import { useFetchAgents } from "../../agents/hooks/useFetchAgents";
import { useFetchJobs } from "../../jobs/hooks/useFetchJobs";
import styles from "../styles/AddEditPassenger.module.css";
import TextInput from "../../../components/inputs/TextInput";
import FileInput from "../../../components/inputs/FileInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";
import PassportForm from "./PassportForm";
import MedicalForm from "./MedicalForm";
import AddressForm from "../../../components/forms/AddressForm";
import { _Address } from "../../../types/Address";

const PassengerForm: React.FC = () => {

    const { passengerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const jobState = useSelector((state: RootState) => state.jobState);
    const agentState = useSelector((state: RootState) => state.agentState);
    const { 
        selectedAgent, 
        selectedJob, 
        passportInfo,
        medicalInfo,
        addressInfo,
        newPassengerInfo 
    } = passengerState; 
    const { fetchAgentList } = useFetchAgents();
    const { fetchJobList } = useFetchJobs();
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);
 
    useEffect(() => {
        fetchAgentList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
        fetchJobList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
    }, [fetchAgentList, fetchJobList])

    const uploadPhoto = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        dispatch(updateState({
            name: "photo",
            value: event.target.files[0]
        }));
    }, [dispatch, updateState])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, dataset } = event.target;

        if(dataset.type === "address") {
            dispatch(addNewAddressInfo({ name, value }))
            return;
        }
        
        if(dataset.type === "passport") {
            dispatch(addNewPassportInfo({ name, value }))
            return;
        }

        if(dataset.type === "medical") {
            dispatch(addNewMedicalInfo({ name, value }))
            return;
        }

        dispatch(addNewPassengerInfo({ name, value }));

    }, [dispatch, addNewPassengerInfo, addNewAddressInfo, addNewMedicalInfo, addNewPassportInfo])

    const selectDate = (date: Date | null, options: { group: string, field: string }) => {
   
        const { group, field: name } = options;

        if(group === "basic") {
            dispatch(addNewPassengerInfo({ 
                name, 
                value: date 
            }));
            return;
        }

        if(group === "passport") {
            dispatch(addNewPassportInfo({ 
                name, 
                value: date 
            }));
            return;
        }

        if(group === "medical") {
            dispatch(addNewMedicalInfo({ 
                name, 
                value: date 
            }));
        }

    }

    const selectJob = useCallback((job: Job) => {
        dispatch(updateState({
            name: "selectedJob",
            value: job
        }));
    }, [dispatch, updateState])

    const selectAgent = useCallback((agent: Agent) => {
        dispatch(updateState({
            name: "selectedAgent",
            value: agent
        }));
    }, [dispatch, updateState])

    const saveUser = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if(
            !newPassengerInfo.name ||
            !newPassengerInfo.phone
        ) {
            setValidationError(true);
            return;
        }

        if(!selectedAgent) {
            setValidationErrorMsg("Select an agent");
            return;
        }

        const requestBody = getPassengerRequestBody({
            newPassengerInfo,
            passportInfo,
            medicalInfo,
            addressInfo
        });

        try {
            if(passengerId) {
                await editPassenger(
                    passengerId, 
                    {
                        ...requestBody,
                        agentId: selectedAgent.id,
                        jobId: selectedJob?.id
                    }
                )
            } else {
                await createPassenger( {
                    ...requestBody,
                    address: {
                        line1: requestBody.address ?? null
                    },
                    agentId: selectedAgent.id,
                    jobId: selectedJob?.id
                });
            }
            navigate("/passengers")
        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
            console.log(error);
        }

    }, [
        newPassengerInfo, 
        passportInfo,
        medicalInfo,
        addressInfo,
        selectedAgent,
        selectedJob,
        navigate, 
        setValidationError, 
        validatePassword, 
        createPassenger, 
        editPassenger
    ])

    return (
        <form className={styles.passenger_form} onSubmit={saveUser}>
            <div className={styles.photo_input}>
                <FileInput 
                    handleFile={uploadPhoto}
                />
            </div>
            <div className={styles.flex_dropdown_input}>
                <DropdownList 
                    label={"Agent"}
                    required={true}
                    data={agentState.agentList}
                    nameKey="firstName"
                    selectedValue={selectedAgent?.firstName ?? "Select Agent"}
                    onClick={selectAgent}
                />
                <DropdownList 
                    label={"Job"}
                    data={jobState.jobList}
                    nameKey="name"
                    selectedValue={selectedJob?.name ?? "Select Job"}
                    onClick={selectJob}
                />
            </div>
            <h3>Basic Info</h3>
            <div className={styles.passenger_form_group}>
                <div className={styles.flex_input}>
                    <TextInput
                        required={true}
                        label="Full Name"
                        name="name"
                        data-type="basic"
                        value={newPassengerInfo.name}
                        error={validationError}
                        errorMsg="name is required"
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        data-type="basic"
                        value={newPassengerInfo.email}
                        onChange={handleChange}
                    />
                    <TextInput
                        required={true}
                        label="Phone"
                        name="phone"
                        data-type="basic"
                        value={newPassengerInfo.phone}
                        error={validationError}
                        errorMsg="phone is required"
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.flex_input}>
                    <div className={styles.datepicker}>
                        <label>Birth Date</label>
                        <DatePicker 
                            selected={newPassengerInfo.birthDate}
                            onChange={(date) => selectDate(date, { group: "basic", field: "birthDate" })}
                        />
                    </div>
                    <TextInput
                        label="Age"
                        type="number"
                        name="age"
                        data-type="basic"
                        value={newPassengerInfo.age}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="National ID"
                        name="nationalId"
                        data-type="basic"
                        value={newPassengerInfo.nationalId}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.flex_input}>
                    <TextInput
                        label="Weight"
                        name="weight"
                        data-type="basic"
                        value={newPassengerInfo.weight}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Height"
                        name="height"
                        data-type="basic"
                        value={newPassengerInfo.height}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Occupation"
                        name="occupation"
                        data-type="basic"
                        value={newPassengerInfo.occupation}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <h3>Passport Info</h3>
            <PassportForm 
                handleChange={handleChange}
                selectDate={selectDate}
            />
            <h3>Visa Info</h3>
            <div className={styles.passenger_form_group}>
                <div className={styles.flex_input}>
                    <TextInput
                        label="Visa Number"
                        name="visaNumber"
                        data-type="basic"
                        value={newPassengerInfo.visaNumber}
                        onChange={handleChange}
                    />
                    <div className={styles.datepicker}>
                        <label>Visa Expiry Date</label>
                        <DatePicker 
                            selected={newPassengerInfo.visaExpiryDate}
                            onChange={(date) => selectDate(date, { group: "basic", field: "visaExpiryDate" })}
                        />
                    </div>
                </div>
                <div className={styles.flex_input}>
                    <TextInput
                        label="Enjaz Number"
                        name="enjazNumber"
                        data-type="basic"
                        value={newPassengerInfo.enjazNumber}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="ID Number"
                        name="idNumber"
                        data-type="basic"
                        value={newPassengerInfo.idNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <h3>Medical Info</h3>
            <MedicalForm 
                handleChange={handleChange}
                selectDate={selectDate}
            />
            <h3>Address</h3>
            <div className={styles.passenger_form_group}>
                <AddressForm 
                    address={addressInfo}
                    handleChange={handleChange}
                />
            </div>
            <h3>Cost And Sale</h3>
            <div className={styles.passenger_form_group}>
                <div className={styles.flex_input}>
                    <TextInput
                        label="Cost"
                        name="cost"
                        data-type="basic"
                        value={newPassengerInfo.cost}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Sale"
                        name="sale"
                        data-type="basic"
                        value={newPassengerInfo.sale}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {
                validationErrorMsg
                ?
                <ValidationErrorMessage 
                    message={validationErrorMsg}
                />
                :
                null
            }
            <div className={styles.save_btn_container}>
                <Button type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
    
}

export default PassengerForm;

