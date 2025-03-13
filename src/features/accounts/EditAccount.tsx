import styles from "./styles/AddEditAccount.module.css"
import AccountForm from "./components/AccountForm";

const EditAccount: React.FC = () => {

    return (
        <div className={styles.add_edit_account}>
            <h2>Edit Account</h2>
            <AccountForm />
        </div>
    );
    
}

export default EditAccount;

