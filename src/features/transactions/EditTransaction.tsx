import styles from "./styles/AddEditTransaction.module.css"
import TransactionForm from "./components/TransactionForm";

const EditTransaction: React.FC = () => {

    return (
        <div className={styles.add_edit_transaction}>
            <h2>Edit Transaction</h2>
            <TransactionForm />
        </div>
    );
    
}

export default EditTransaction;

