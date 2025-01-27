import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { addNewCompanyInfo } from "../slices/companyReducer";
import { createCompany, editCompany } from "../../../services/companies";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import styles from "../styles/AddEditCompany.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const CompanyForm: React.FC = () => {

    const { companyId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const companyState = useSelector((state: RootState) => state.companyState);
    const { newCompanyInfo } = companyState; 
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null)

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewCompanyInfo({ name, value }))
    }, [dispatch, addNewCompanyInfo])

    const saveCompany = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            name,
            email,
            phone, 
            address
        } = newCompanyInfo;

        if(
            !name ||
            !email ||
            !phone ||
            !address
        ) {
            setValidationError(true);
            return;
        }

        try {
            if(companyId) {
                await editCompany(companyId, newCompanyInfo)
            } else {
                await createCompany(newCompanyInfo);
            }
            navigate("/companies")
        } catch(error) {
            console.log(error);
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
        }

    }, [newCompanyInfo, navigate, setValidationError, createCompany, editCompany])

    return (
        <form className={styles.company_form} onSubmit={saveCompany}>
            <TextInput
                required={true}
                label="Company Name"
                name="name"
                placeholder="ABC Company"
                value={newCompanyInfo.name}
                error={validationError}
                errorMsg="name is required"
                onChange={handleChange}
            />
            <TextInput
                required={true}
                label="Company Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={newCompanyInfo.email}
                error={validationError}
                errorMsg="email is required"
                onChange={handleChange}
            />
            <TextInput
                required={true}
                label="Company Phone"
                name="phone"
                placeholder="+8801717062884"
                value={newCompanyInfo.phone}
                error={validationError}
                errorMsg="phone is required"
                onChange={handleChange}
            />
             <TextInput
                required={true}
                label="Company Address"
                name="address"
                placeholder=""
                value={newCompanyInfo.address}
                error={validationError}
                errorMsg="name is required"
                onChange={handleChange}
            />
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

export default CompanyForm;

