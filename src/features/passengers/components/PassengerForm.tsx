import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { RootState } from "../../../store";
import { PassengerStatus } from "../types/PassengerState";
import { 
    updateState, 
    addNewPassengerInfo,
    addNewAddressInfo,
    addNewMedicalInfo,
    addNewFlightInfo,
    addNewPassportInfo,
    clearPassengerInfo,
    clearNewFlightInfo 
} from "../slices/passengerReducer";
import { createPassenger, editPassenger } from "../../../services/passengers";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { getPassengerRequestBody } from "../utils/getPassengerRequestBody";
import { uploadFiles } from "../../../utils/file-handlers/uploadFiles";
import { removeFiles } from "../../../utils/file-handlers/removeFiles";
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
import FlightTable from "./FlightTable";
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
        newFlightInfo,
        flights,
        newPassengerInfo,
        passengerInAction,
        photo 
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

    useEffect(() => {
        if(photo) {
            dispatch(updateState({
                name: "photo",
                value: null
            }));
        }
        dispatch(clearNewFlightInfo())
        if(passengerId) return;
        dispatch(clearPassengerInfo());
    }, [passengerId, dispatch, updateState])

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

        if(dataset.type === "flight") {
            dispatch(addNewFlightInfo({ name, value }))
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

        if(group === "flight") {
            dispatch(addNewFlightInfo({ 
                name, 
                value: date 
            }));
        }

    }

    const handleDropdownClick = useCallback((item: any) => {

        if(item.hasOwnProperty("firstName")) {
            dispatch(updateState({
                name: "selectedAgent",
                value: item
            }));
            return;
        }

        if(item.hasOwnProperty("visaName")) {
            dispatch(updateState({
                name: "selectedJob",
                value: item
            }));
            return;
        }

        if(item.hasOwnProperty("medical")) {
            dispatch(updateState({
                name: "medicalInfo",
                value: {
                    ...medicalInfo,
                    status: item.status
                }
            }));
            return;
        }

        dispatch(updateState({
            name: "newPassengerInfo",
            value: {
                ...newPassengerInfo,
                status: item.status
            }
        }));

    }, [
        dispatch, 
        newPassengerInfo,
        medicalInfo,
        updateState
    ])


    const addFlight = useCallback((event: any) => {

        event.preventDefault();

        const flightExists = flights.some(flight => flight.number === newFlightInfo.number);
        if(flightExists) return alert("Flight already exists");
       
        let flight: any = {}

        Object.entries(newFlightInfo).forEach(([key, value]) => {
            if(value) {
                flight[key] = value
            }
        });

        dispatch(updateState({
            name: "flights",
            value: [...flights, flight]
        }));

    }, [newFlightInfo, flights, dispatch, updateState])

    const savePassenger = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

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

        let imageUrl: string | undefined;

        if(photo) {

            // Means user is changing the photo. So, need to remove the old photo
            if(passengerInAction?.imageUrl && photo) {
                const { success, message } = await removeFiles([passengerInAction.imageUrl]);
                if(!success) {
                    alert(message);
                    return;
                }
            }

            const { urls, errorMessage } = await uploadFiles([photo], "passengers");
    
            if(errorMessage) {
                alert(errorMessage);
                return;
            }

            if(urls.length > 0) {
                imageUrl = urls[0].url
            }

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
                        imageUrl,
                        flights,
                        agentId: selectedAgent.id,
                        jobId: selectedJob?.id
                    }
                )
            } else {
                await createPassenger( {
                    ...requestBody,
                    imageUrl,
                    flights,
                    agentId: selectedAgent.id,
                    jobId: selectedJob?.id
                });
            }

            navigate("/passengers");
            
        } catch(error) {

            const { message } = handleApiError(error);
            setValidationErrorMsg(message);

            /*
                Only if passengr has no photo and user uploaded one just now we need to remove it.
                If user was trying to replace then we keep the replaced photo. This is rarely going
                to happen so if user changed the photo but edit was not successful then don't bother
            */
            if(imageUrl && !passengerInAction?.imageUrl) {
                await removeFiles([imageUrl]);
            }
            console.log(error);

        }

    }, [
        newPassengerInfo, 
        passportInfo,
        medicalInfo,
        addressInfo,
        selectedAgent,
        selectedJob,
        photo,
        passengerInAction,
        flights,
        navigate, 
        setValidationError, 
        setValidationErrorMsg,
        validatePassword, 
        uploadFiles,
        removeFiles,
        createPassenger, 
        editPassenger,
        handleApiError,
    ])

    return (
        <form className={styles.passenger_form} onSubmit={savePassenger}>
            <div className={styles.photo_input}>
                <FileInput 
                    file={photo}
                    imageUrl={passengerInAction?.imageUrl ?? ""}
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
                    onClick={handleDropdownClick}
                />
                <DropdownList 
                    label={"Job"}
                    data={jobState.jobList}
                    nameKey="name"
                    selectedValue={selectedJob?.name ?? "Select Job"}
                    onClick={handleDropdownClick}
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
                <div className={styles.flex_input}>
                    <TextInput
                        label="Experience"
                        name="experience"
                        data-type="basic"
                        value={newPassengerInfo.experience}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Father's Name"
                        name="fatherName"
                        data-type="basic"
                        value={newPassengerInfo.fatherName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Mother's Name"
                        name="motherName"
                        data-type="basic"
                        value={newPassengerInfo.motherName}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <h3>Address</h3>
            <div className={styles.passenger_form_group}>
                <AddressForm 
                    address={addressInfo}
                    handleChange={handleChange}
                />
            </div>
            <h3>Medical Info</h3>
            <MedicalForm 
                handleDropdownClick={handleDropdownClick}
                selectDate={selectDate}
            />
            <h3>Passport Info</h3>
            <PassportForm 
                handleChange={handleChange}
                selectDate={selectDate}
            />
            <h3>Visa Info</h3>
            <div className={styles.passenger_form_group}>
                <div className={styles.flex_input}>
                    <TextInput
                        label="Visa Application Number"
                        name="visaApplicationNumber"
                        data-type="basic"
                        value={newPassengerInfo.visaApplicationNumber}
                        onChange={handleChange}
                    />
                    <div className={styles.datepicker}>
                        <label>Visa Application Date</label>
                        <DatePicker 
                            selected={newPassengerInfo.visaApplicationDate}
                            onChange={(date) => selectDate(date, { group: "basic", field: "visaApplicationDate" })}
                        />
                    </div>
                    <div className={styles.datepicker}>
                        <label>BMET Date</label>
                        <DatePicker 
                            selected={newPassengerInfo.visaBMETFingerDate}
                            onChange={(date) => selectDate(date, { group: "basic", field: "visaBMETFingerDate" })}
                        />
                    </div>
                </div>
                <div className={styles.flex_input}>
                    <div className={styles.datepicker}>
                        <label>Visa Issue Date</label>
                        <DatePicker 
                            selected={newPassengerInfo.visaIssueDate}
                            onChange={(date) => selectDate(date, { group: "basic", field: "visaIssueDate" })}
                        />
                    </div>
                    <div className={styles.datepicker}>
                        <label>Visa Expiry Date</label>
                        <DatePicker 
                            selected={newPassengerInfo.visaExpiryDate}
                            onChange={(date) => selectDate(date, { group: "basic", field: "visaExpiryDate" })}
                        />
                    </div>
                    <TextInput
                        label="Visa Number"
                        name="visaNumber"
                        data-type="basic"
                        value={newPassengerInfo.visaNumber}
                        onChange={handleChange}
                    />
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

            <h3>Flight Info</h3>
            <div className={styles.passenger_form_group}>
                <div className={styles.flex_input}>
                    <div className={styles.datepicker}>
                        <label>Date</label>
                        <DatePicker 
                            selected={newFlightInfo.date}
                            onChange={(date) => selectDate(date, { group: "flight", field: "date" })}
                        />
                    </div>
                    <TextInput
                        label="Airlines Name"
                        name="airlinesName"
                        data-type="flight"
                        value={newFlightInfo.airlinesName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Flight Number"
                        name="number"
                        data-type="flight"
                        value={newFlightInfo.number}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.flex_input}>
                    <div className={styles.datepicker}>
                        <label>Departure Date</label>
                        <DatePicker 
                            selected={newFlightInfo.departureDate}
                            onChange={(date) => selectDate(date, { group: "flight", field: "departureDate" })}
                        />
                    </div>
                    <TextInput
                        label="Departure Place And Time"
                        name="departurePlaceAndTime"
                        data-type="flight"
                        value={newFlightInfo.departurePlaceAndTime}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.flex_input}>
                    <div className={styles.datepicker}>
                        <label>Arrival Date</label>
                        <DatePicker 
                            selected={newFlightInfo.arrivalDate}
                            onChange={(date) => selectDate(date, { group: "flight", field: "arrivalDate" })}
                        />
                    </div>
                    <TextInput
                        label="Arrival Place And Time"
                        name="arrivalPlaceAndTime"
                        data-type="flight"
                        value={newFlightInfo.arrivalPlaceAndTime}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.flight_add_button}>
                    <button onClick={addFlight}>
                        Add
                    </button>
                </div>
                {
                    flights.length > 0
                    ?
                    <FlightTable />
                    :
                    null
                }
                
            </div>
            <h3>Cost, Sale And Status</h3>
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
                    <DropdownList 
                        label={"Status"}
                        data={[
                            { id: 1, status: PassengerStatus.Processing },
                            { id: 2, status: PassengerStatus.Completed }
                        ]}
                        nameKey="status"
                        selectedValue={newPassengerInfo.status}
                        onClick={handleDropdownClick}
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

