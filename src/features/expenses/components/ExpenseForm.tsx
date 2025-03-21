import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";
import { Account } from "../../accounts/types/Account";
import { updateState, addNewExpenseInfo, clearExpenseInfo } from "../slices/expenseReducer";
import { createExpense, editExpense } from "../../../services/expenses";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { useFetchJobs } from "../../jobs/hooks/useFetchJobs";
import { useFetchPassengers } from "../../passengers/hooks/useFetchPassengers";
import { useFetchAccounts } from "../../accounts/hooks/useFetchAccounts";
import styles from "../styles/AddEditExpense.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import { ExpenseRequestBody } from "../types/ExpenseState";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const ExpenseForm: React.FC = () => {

    const { expenseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const expenseState = useSelector((state: RootState) => state.expenseState);
    const jobState = useSelector((state: RootState) => state.jobState);
    const accountState = useSelector((state: RootState) => state.accountState);
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { 
        newExpenseInfo, 
        selectedJob, 
        selectedPassenger,
        selectedAccount 
    } = expenseState; 
    const { fetchPassengerList } = useFetchPassengers();
    const { fetchJobList } = useFetchJobs();
    const { fetchAccountList } = useFetchAccounts();
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        fetchPassengerList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
        fetchJobList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
        fetchAccountList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
    }, [fetchPassengerList, fetchJobList, fetchAccountList])

    useEffect(() => {
        if(expenseId) return;
        dispatch(clearExpenseInfo());
    }, [expenseId])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewExpenseInfo({ name, value }))
    }, [dispatch, addNewExpenseInfo])

    const selectJob = useCallback((job: Job) => {
        dispatch(updateState({
            name: "selectedJob",
            value: job
        }))
        if(selectedPassenger) {
            dispatch(updateState({
                name: "selectedPassenger",
                value: null
            }));
        }
    }, [dispatch, selectedPassenger, updateState])

    const selectPassenger = useCallback((passenger: Passenger) => {
        dispatch(updateState({
            name: "selectedPassenger",
            value: passenger
        }));
        dispatch(updateState({
            name: "selectedJob",
            value: passenger.job
        }))
    }, [dispatch, updateState]);

    const selectAccount = useCallback((account: Account) => {
        dispatch(updateState({
            name: "selectedAccount",
            value: account
        }));
    }, [dispatch, updateState])

    const saveExpense = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            name,
            description,
            amount
        } = newExpenseInfo;

        if(
            !name ||
            !amount
        ) {
            setValidationError(true);
            return;
        }

        let requestBody: ExpenseRequestBody = {
            name,
            description: description !== "" ? description : undefined,
            amount: Number(amount) ?? 0,
            jobId: selectedJob?.id,
            passengerId: selectedPassenger?.id,
            debitedFromAccountId: selectedAccount?.id
        };

        try {

            if(expenseId) {
                await editExpense(expenseId, requestBody)
            } else {
                await createExpense(requestBody);
            }

            navigate("/expenses");

        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
        }

    }, [
        newExpenseInfo, 
        navigate, 
        setValidationError, 
        validatePassword, 
        createExpense, 
        selectedJob,
        selectedPassenger,
        selectedAccount,
        editExpense,
        expenseId,
        handleApiError,
        setValidationErrorMsg
    ])

    return (
        <form className={styles.expense_form} onSubmit={saveExpense}>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Name"
                    name="name"
                    value={newExpenseInfo.name}
                    error={validationError}
                    errorMsg="expense name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Amount"
                    type="number"
                    name="amount"
                    value={newExpenseInfo.amount}
                    error={validationError}
                    errorMsg="amount is required"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                label="Description"
                name="description"
                value={newExpenseInfo.description}
                onChange={handleChange}
            />
            <div className={styles.flex_input}>
                <DropdownList 
                    label={"Job"}
                    data={jobState.jobList}
                    nameKey="name"
                    selectedValue={selectedJob?.name ?? "Select Job"}
                    onClick={selectJob}
                />
                <DropdownList 
                    label={"Passenger"}
                    data={passengerState.passengerList}
                    nameKey="name"
                    selectedValue={selectedPassenger?.name ?? "Select Passenger"}
                    onClick={selectPassenger}
                />
                <DropdownList 
                    label={"Debited From"}
                    data={accountState.accountList}
                    nameKey="name"
                    selectedValue={selectedAccount?.name ?? "Select Account"}
                    onClick={selectAccount}
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

export default ExpenseForm;

