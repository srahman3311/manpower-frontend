import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, addNewExpenseInfo } from "../slices/expenseReducer";
import { createExpense, editExpense } from "../../../services/expenses";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { useFetchJobs } from "../../jobs/hooks/useFetchJobs";
import { useFetchPassengers } from "../../passengers/hooks/useFetchPassengers";
import styles from "../styles/AddEditExpense.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import { ExpenseRequestBody } from "../types/ExpenseState";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";
import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";

const ExpenseForm: React.FC = () => {

    const { expenseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const expenseState = useSelector((state: RootState) => state.expenseState);
    const jobState = useSelector((state: RootState) => state.jobState);
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { newExpenseInfo, selectedJob, selectedPassenger } = expenseState; 
    const { fetchPassengerList } = useFetchPassengers();
    const { fetchJobList } = useFetchJobs();
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
    }, [fetchPassengerList, fetchJobList])

    useEffect(() => {
        if(expenseId) return;
        dispatch(updateState({
            name: "newExpenseInfo",
            value: {
                ...newExpenseInfo,
                name: "",
                description: "",
                amount: ""
            }
        }));
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
            passengerId: selectedPassenger?.id
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
        editExpense
    ])

    return (
        <form className={styles.expense_form} onSubmit={saveExpense}>
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
                label="Description"
                name="description"
                value={newExpenseInfo.description}
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
            <div className={styles.flex_input}>
                <DropdownList 
                    label={"Job"}
                    required={true}
                    data={jobState.jobList}
                    nameKey="name"
                    selectedValue={selectedJob?.name ?? "Select Job"}
                    onClick={selectJob}
                />
                <DropdownList 
                    label={"Passenger"}
                    required={true}
                    data={passengerState.passengerList}
                    nameKey="name"
                    selectedValue={selectedPassenger?.name ?? "Select Passenger"}
                    onClick={selectPassenger}
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

