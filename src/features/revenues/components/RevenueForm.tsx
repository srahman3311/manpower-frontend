import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, addNewRevenueInfo, clearRevenueInfo } from "../slices/revenueReducer";
import { createRevenue, editRevenue } from "../../../services/revenues";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { useFetchJobs } from "../../jobs/hooks/useFetchJobs";
import { useFetchAccounts } from "../../accounts/hooks/useFetchAccounts";
import styles from "../styles/AddEditRevenue.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import { RevenueRequestBody } from "../types/RevenueState";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";
import PassengerSearchInput from "../../passengers/components/PassengerSearchInput";
import { Job } from "../../jobs/types/Job";
import { Passenger } from "../../passengers/types/Passenger";
import { Account } from "../../accounts/types/Account";

const RevenueForm: React.FC = () => {

    const { revenueId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const revenueState = useSelector((state: RootState) => state.revenueState);
    const jobState = useSelector((state: RootState) => state.jobState);
    const accountState = useSelector((state: RootState) => state.accountState);
    const { 
        newRevenueInfo, 
        selectedJob, 
        selectedPassenger,
        selectedAccount 
    } = revenueState; 
    const { fetchJobList } = useFetchJobs();
    const { fetchAccountList } = useFetchAccounts();
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
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
    }, [fetchJobList, fetchAccountList])

    useEffect(() => {
        if(revenueId) return;
        dispatch(clearRevenueInfo())
    }, [revenueId])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewRevenueInfo({ name, value }))
    }, [dispatch, addNewRevenueInfo])

    const selectJob = useCallback((job: Job) => {
        dispatch(updateState({
            name: "selectedJob",
            value: job
        }));
        if(selectedPassenger) {
            dispatch(updateState({
                name: "selectedPassenger",
                value: null
            }));
        }
    }, [dispatch, selectedPassenger, updateState])

    const selectPassenger = useCallback((passenger: Passenger | null) => {
        dispatch(updateState({
            name: "selectedPassenger",
            value: passenger
        }))
        dispatch(updateState({
            name: "selectedJob",
            value: passenger?.job ?? null
        }))
    }, [dispatch, updateState])

    const selectAccount = useCallback((account: Account) => {
        dispatch(updateState({
            name: "selectedAccount",
            value: account
        }))
    }, [dispatch, updateState])

    const saveRevenue = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            name,
            description,
            amount
        } = newRevenueInfo;

        if(
            !name ||
            !amount
        ) {
            setValidationError(true);
            return;
        }

        let requestBody: RevenueRequestBody = {
            name,
            description: description !== "" ? description : undefined,
            amount: Number(amount) ?? 0,
            jobId: selectedJob?.id,
            passengerId: selectedPassenger?.id,
            creditedToAccountId: selectedAccount?.id
        };

        try {
            if(revenueId) {
                await editRevenue(revenueId, requestBody)
            } else {
                await createRevenue(requestBody);
            }

            navigate("/revenues")
        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
        }

    }, [
        newRevenueInfo, 
        navigate, 
        setValidationError, 
        validatePassword, 
        createRevenue, 
        selectedJob,
        selectedPassenger,
        selectedAccount,
        editRevenue,
        handleApiError,
        setValidationErrorMsg,
        revenueId
    ])

    return (
        <form className={styles.revenue_form} onSubmit={saveRevenue}>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Name"
                    name="name"
                    value={newRevenueInfo.name}
                    error={validationError}
                    errorMsg="expense name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Amount"
                    type="number"
                    name="amount"
                    value={newRevenueInfo.amount}
                    error={validationError}
                    errorMsg="amount is required"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                label="Description"
                name="description"
                value={newRevenueInfo.description}
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
                <PassengerSearchInput 
                    selectedPassenger={selectedPassenger}
                    selectPassenger={selectPassenger}
                />
                <DropdownList 
                    label={"Credited To"}
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

export default RevenueForm;

