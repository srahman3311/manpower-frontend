import { useMemo } from "react";
import { Expense } from "../types/Expense";
import styles from "../styles/ExpenseULList.module.css"

interface ExpenseULListProps {
    loading: boolean
    errorMsg: string | null
    expenseList: Expense[]
}

const ExpenseULList: React.FC<ExpenseULListProps> = ({ loading, errorMsg, expenseList }) => {

    const totalExpense = useMemo(() => {
        return expenseList.reduce((total, item) => item.amount + total, 0)
    }, [expenseList]);

    return(
        <>
        {
            loading
            ?
            <div>Loading...</div>
            :
            errorMsg
            ?
            <div>{errorMsg}</div>
            :
            expenseList.length <= 0
            ?
            <div>No expenses to show</div>
            :
            <div className={styles.expense_list}>
                <ul>
                    {expenseList.map(expense => {
                        return(
                            <li key={expense.id} className={styles.expense_item}>
                                <span>{expense.name}</span>
                                <span>{expense.amount}</span>
                            </li>
                        );
                    })}
                    {
                        expenseList.length > 0
                        ?
                        <li className={styles.expense_item}>
                            <span>Total</span>
                            <span>{totalExpense}</span>
                        </li>
                        :
                        null
                    }
                </ul>
            </div>
        }
        </>
    )

}

export default ExpenseULList;