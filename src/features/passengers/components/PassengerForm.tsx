import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { Job } from "../../jobs/types/Job";
import { Agent } from "../../agents/types/Agent";
import { updateState, addNewPassengerInfo } from "../slices/passengerReducer";
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

const PassengerForm: React.FC = () => {

    const { passengerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const jobState = useSelector((state: RootState) => state.jobState);
    const agentState = useSelector((state: RootState) => state.agentState);
    const { selectedAgent, selectedJob, newPassengerInfo } = passengerState; 
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

    useEffect(() => {
        if(passengerId) return;
        dispatch(updateState({
            name: "newPassengerInfo",
            value: {
                ...newPassengerInfo,
                name: "",
                phone: "",
                email: "",
                address: "",
                fatherName: "",
                motherName: "",
                age: "",
                occupation: "",
                experience: "",
                weight: "",
                height: "",
                nationalId: "",
            }
        }));
    }, [passengerId])

    const uploadPhoto = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        dispatch(updateState({
            name: "photo",
            value: event.target.files[0]
        }));
    }, [dispatch, updateState])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewPassengerInfo({ name, value }))
    }, [dispatch, addNewPassengerInfo])

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

        const requestBody = getPassengerRequestBody(newPassengerInfo);
        
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
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={newPassengerInfo.name}
                    error={validationError}
                    errorMsg="name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Phone"
                    name="phone"
                    value={newPassengerInfo.phone}
                    error={validationError}
                    errorMsg="phone is required"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={newPassengerInfo.email}
                onChange={handleChange}
            />
            <div className={styles.flex_dropdown_input}>
                <DropdownList 
                    label={"Job"}
                    data={jobState.jobList}
                    nameKey="name"
                    selectedValue={selectedJob?.name ?? "Select Job"}
                    onClick={selectJob}
                />
                <DropdownList 
                    label={"Agent"}
                    required={true}
                    data={agentState.agentList}
                    nameKey="firstName"
                    selectedValue={selectedAgent?.firstName ?? "Select Agent"}
                    onClick={selectAgent}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    label="Age"
                    type="number"
                    name="age"
                    value={newPassengerInfo.age}
                    onChange={handleChange}
                />
                <TextInput
                    label="National ID"
                    name="nationalId"
                    value={newPassengerInfo.nationalId}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    label="Occupation"
                    name="occupation"
                    value={newPassengerInfo.occupation}
                    onChange={handleChange}
                />
                <TextInput
                    label="Experience"
                    name="experience"
                    value={newPassengerInfo.experience}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    label="Weight"
                    name="weight"
                    value={newPassengerInfo.weight}
                    onChange={handleChange}
                />
                <TextInput
                    label="Height"
                    name="height"
                    value={newPassengerInfo.height}
                    onChange={handleChange}
                />
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
                    Submit
                </Button>
            </div>
        </form>
    );
    
}

export default PassengerForm;

