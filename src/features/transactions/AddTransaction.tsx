import styles from "./styles/AddEditTransaction.module.css"
import TransactionForm from "./components/TransactionForm";

const AddTransaction: React.FC = () => {

    return (
        <div className={styles.add_edit_transaction}>
            <h2>Add Transaction</h2>
            <TransactionForm />
        </div>
    );
    
}

export default AddTransaction;

