import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { Company } from "../../companies/types/Company";
import { JobRequestBody } from "../types/JobState";
import { updateState, addNewJobInfo } from "../slices/jobReducer";
import { createJob, editJob } from "../../../services/jobs";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { useFetchCompanies } from "../../companies/hooks/useFetchCompanies";
import styles from "../styles/AddEditJob.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const JobForm: React.FC = () => {

    const { jobId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const jobState = useSelector((state: RootState) => state.jobState)
    const companyState = useSelector((state: RootState) => state.companyState)
    const { newJobInfo, selectedVisaCompany } = jobState; 
    const { fetchCompanyList } = useFetchCompanies()
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        fetchCompanyList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
    }, [fetchCompanyList])

    useEffect(() => {
        if(jobId) return;
        dispatch(updateState({
            name: "newJobInfo",
            value: {
                ...newJobInfo,
                name: "",
                visaName: "",
                visaQuantity: "",
                visaUnitPrice: "",
                address: ""
            }
        }));
    }, [jobId])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewJobInfo({ name, value }))
    }, [dispatch, addNewJobInfo])

    const selectVisaCompany = useCallback((company: Company) => {
        console.log(company)
        dispatch(updateState({
            name: "selectedVisaCompany",
            value: company
        }))
    }, [dispatch, updateState])

    const selectVisaType = useCallback((visaType: { id: number, type: string }) => {
        dispatch(addNewJobInfo({ name: "visaType", value: visaType.type }))
    }, [dispatch, addNewJobInfo])

    const saveJob = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            name,
            visaType,
            visaName,
            visaQuantity,
            visaUnitPrice
        } = newJobInfo;

        if(
            !name ||
            !visaName ||
            !visaQuantity ||
            !visaUnitPrice
        ) {
            setValidationError(true);
            return;
        }

        if(!selectedVisaCompany) return;

        console.log(selectedVisaCompany)

        let requestBody: JobRequestBody = {
            name,
            visaType,
            visaName,
            visaQuantity: parseInt(visaQuantity),
            visaUnitPrice: Number(visaUnitPrice),
            visaCompanyId: selectedVisaCompany.id
        }

        // console.log(requestBody);
        // return;

        try {
            if(jobId) {
                await editJob(
                    jobId, 
                    requestBody
                )
            } else {
                await createJob(requestBody);
            }
            navigate("/jobs")
        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
            console.log(error);
        }

    }, [newJobInfo, selectedVisaCompany, navigate, setValidationError, createJob, editJob])

    console.log(selectedVisaCompany)

    return (
        <form className={styles.job_form} onSubmit={saveJob}>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Job Name"
                    name="name"
                    value={newJobInfo.name}
                    error={validationError}
                    errorMsg="job name is required"
                    onChange={handleChange}
                />
                <DropdownList 
                    label={"Visa Type"}
                    required={true}
                    data={[
                        { id: 1, type: "sale" },
                        { id: 2, type: "processing" }
                    ]}
                    nameKey="type"
                    selectedValue={newJobInfo.visaType}
                    onClick={selectVisaType}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Visa Name"
                    name="visaName"
                    value={newJobInfo.visaName}
                    error={validationError}
                    errorMsg="visa name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Visa Qty"
                    type="number"
                    name="visaQuantity"
                    min="1"
                    value={newJobInfo.visaQuantity}
                    onChange={handleChange}
                /> 
              
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Visa Unit Price"
                    type="number"
                    name="visaUnitPrice"
                    min="1"
                    value={newJobInfo.visaUnitPrice}
                    onChange={handleChange}
                />
                <DropdownList 
                    label={"Visa Company"}
                    required={true}
                    data={companyState.companyList}
                    nameKey="name"
                    selectedValue={selectedVisaCompany?.name ?? "Select Visa Company"}
                    onClick={selectVisaCompany}
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

export default JobForm;

