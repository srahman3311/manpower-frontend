import styles from "./styles/AddEditExpense.module.css"
import ExpenseForm from "./components/ExpenseForm";

const EditExpense: React.FC = () => {

    return (
        <div className={styles.add_edit_expense}>
            <h2>Edit Expense</h2>
            <ExpenseForm />
        </div>
    );
    
}

export default EditExpense;

