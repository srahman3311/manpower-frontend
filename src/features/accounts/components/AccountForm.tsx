import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, addNewAccountInfo } from "../slices/accountReducer";
import { createAccount, editAccount } from "../../../services/accounts";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import styles from "../styles/AddEditAccount.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const AccountForm: React.FC = () => {

    const { accountId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const accountState = useSelector((state: RootState) => state.accountState);
    const { newAccountInfo } = accountState; 
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if(accountId) return;
        dispatch(updateState({
            name: "newAccountInfo",
            value: {
                ...newAccountInfo,
                name: "",
                bankName: "",
                bankBranchName: "",
                bankAccountHolderName: "",
                bankAccountNumber: "",
                balance: "",
            }
        }));
    }, [accountId])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewAccountInfo({ name, value }))
    }, [dispatch, addNewAccountInfo])

    const saveAccount = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            name,
            bankName,
            bankBranchName,
            bankAccountHolderName,
            bankAccountNumber, 
            balance
        } = newAccountInfo;

        if(!name) {
            setValidationError(true);
            return;
        }

        const requestBody = {
            name,
            bankName: bankName ?? undefined,
            bankBranchName: bankBranchName ?? undefined,
            bankAccountHolderName: bankAccountHolderName ?? undefined,
            bankAccountNumber: bankAccountNumber ?? undefined,
            balance: balance ? Number(balance) : 0
        }

        try {
            if(accountId) {
                await editAccount(accountId, requestBody)
            } else {
                await createAccount(requestBody);
            }
            navigate("/accounts")
        } catch(error) {
            console.log(error);
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
        }

    }, [newAccountInfo, navigate, setValidationError, createAccount, editAccount])

    return (
        <form className={styles.account_form} onSubmit={saveAccount}>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Account Name"
                    name="name"
                    value={newAccountInfo.name}
                    error={validationError}
                    errorMsg="name is required"
                    onChange={handleChange}
                />
                <TextInput
                    label="Bank Name"
                    name="bankName"
                    value={newAccountInfo.bankName}
                    onChange={handleChange}
                />
                <TextInput
                    label="Branch"
                    name="bankBranchName"
                    value={newAccountInfo.bankBranchName}
                    onChange={handleChange}
                />
                <TextInput
                    label="Account Holder"
                    name="bankAccountHolderName"
                    value={newAccountInfo.bankAccountHolderName}
                    onChange={handleChange}
                />
                <TextInput
                    label="Account Number"
                    name="bankAccountNumber"
                    value={newAccountInfo.bankAccountNumber}
                    onChange={handleChange}
                />
                <TextInput
                    label="Balance"
                    name="balance"
                    value={newAccountInfo.balance}
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

export default AccountForm;

