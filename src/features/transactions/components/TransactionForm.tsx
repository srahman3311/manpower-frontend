import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { AccountUserDataItem } from "../types/TransactionState";
import { 
    addNewTransactionInfo, 
    updateState,
    clearTransactionInfo 
} from "../slices/transactionReducer";
import { createTransaction, editTransaction } from "../../../services/transactions";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { useFetchUsers } from "../../users/hooks/useFetchUsers";
import { useFetchAccounts } from "../../accounts/hooks/useFetchAccounts";
import styles from "../styles/AddEditTransaction.module.css";
import TextInput from "../../../components/inputs/TextInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import { TransactionRequestBody } from "../types/TransactionState";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const TransactionForm: React.FC = () => {

    const { transactionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const transactionState = useSelector((state: RootState) => state.transactionState);
    const userState = useSelector((state: RootState) => state.userState);
    const accountState = useSelector((state: RootState) => state.accountState);
    const { userList } = userState;
    const { accountList } = accountState;
    const { 
        newTransactionInfo, 
        selectedDebitedFromItem, 
        selectedCreditedToItem,
    } = transactionState; 
    const { fetchUserList } = useFetchUsers();
    const { fetchAccountList } = useFetchAccounts();
    const [accountUserData, setAccountUserData] = useState<AccountUserDataItem[]>([])
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        fetchUserList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
        fetchAccountList({ 
            searchText: "", 
            skip: 0, 
            limit: 1000 
        });
    }, [fetchUserList, fetchAccountList])

    useEffect(() => {
        if(transactionId) return;
        dispatch(clearTransactionInfo());
    }, [transactionId])

    useEffect(() => {
        if(
            userList.length <= 0 || 
            accountList.length <= 0
        ) {
            return;
        } 

        const accountUserList: AccountUserDataItem[] = []

        for(const user of userList) {
            accountUserList.push({
                itemId: user.id,
                type: "user",
                title: user.firstName,
                id: `${user.id}-${user.firstName}`
            });
        }

        for(const account of accountList) {
            accountUserList.push({
                itemId: account.id,
                type: "account",
                title: account.name,
                id: `${account.id}-${account.name}`
            })
        }

        setAccountUserData(accountUserList)

    }, [userList.length, accountList.length])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewTransactionInfo({ name, value }))
    }, [dispatch, addNewTransactionInfo])

    const selectDebitItem = useCallback((item: AccountUserDataItem) => {
        dispatch(updateState({
            name: "selectedDebitedFromItem",
            value: item
        }))
    }, [dispatch, updateState])

    const selectCreditItem = useCallback((item: AccountUserDataItem) => {
        dispatch(updateState({
            name: "selectedCreditedToItem",
            value: item
        }))
    }, [dispatch, updateState]);

    const saveTransaction = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            name,
            description,
            amount
        } = newTransactionInfo;

        if(
            !name ||
            !amount
        ) {
            setValidationError(true);
            return;
        }

        if(!selectedDebitedFromItem || !selectedCreditedToItem) {
            setValidationErrorMsg("Select both debit and credit accounts or users");
            return;
        }

        let requestBody: TransactionRequestBody = {
            name,
            description: description !== "" ? description : undefined,
            amount: Number(amount) ?? 0,
            debitedFromAccountId: selectedDebitedFromItem?.type === "account" ? selectedDebitedFromItem?.itemId : undefined,
            debitedFromUserId: selectedDebitedFromItem?.type === "user" ? selectedDebitedFromItem?.itemId : undefined,
            creditedToAccountId: selectedCreditedToItem?.type === "account" ? selectedCreditedToItem?.itemId : undefined,
            creditedToUserId: selectedCreditedToItem?.type === "user" ? selectedCreditedToItem?.itemId : undefined
        };

        try {

            if(transactionId) {
                await editTransaction(transactionId, requestBody)
            } else {
                await createTransaction(requestBody);
            }

            navigate("/transactions");

        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
        } 

    }, [
        newTransactionInfo, 
        navigate, 
        setValidationError, 
        createTransaction, 
        selectedDebitedFromItem,
        selectedCreditedToItem,
        editTransaction,
        transactionId,
        handleApiError,
        setValidationErrorMsg
    ])

    return (
        <form className={styles.transaction_form} onSubmit={saveTransaction}>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Name"
                    name="name"
                    value={newTransactionInfo.name}
                    error={validationError}
                    errorMsg="expense name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Amount"
                    type="number"
                    name="amount"
                    value={newTransactionInfo.amount}
                    error={validationError}
                    errorMsg="amount is required"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                label="Description"
                name="description"
                value={newTransactionInfo.description}
                onChange={handleChange}
            />
            <div className={styles.flex_input}>
                <DropdownList 
                    label={"Debited From"}
                    data={accountUserData}
                    nameKey="title"
                    selectedValue={selectedDebitedFromItem?.title ?? ""}
                    onClick={selectDebitItem}
                />
                <DropdownList 
                    label={"Credited To"}
                    data={accountUserData}
                    nameKey="title"
                    selectedValue={selectedCreditedToItem?.title ?? ""}
                    onClick={selectCreditItem}
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

export default TransactionForm;

