import styles from "./styles/AddEditExpense.module.css"
import ExpenseForm from "./components/ExpenseForm";

const AddExpense: React.FC = () => {

    return (
        <div className={styles.add_edit_expense}>
            <h2>Add Expense</h2>
            <ExpenseForm />
        </div>
    );
    
}

export default AddExpense;

