import styles from "./styles/AddEditAccount.module.css"
import AccountForm from "./components/AccountForm";

const AddAccount: React.FC = () => {

    return (
        <div className={styles.add_edit_account}>
            <h2>Add Account</h2>
            <AccountForm />
        </div>
    );
    
}

export default AddAccount;

