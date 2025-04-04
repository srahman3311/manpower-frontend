import styles from "./styles/AddEditRevenue.module.css"
import RevenueForm from "./components/RevenueForm";

const AddRevenue: React.FC = () => {

    return (
        <div className={styles.add_edit_revenue}>
            <h2>Add Revenue</h2>
            <RevenueForm />
        </div>
    );
    
}

export default AddRevenue;

