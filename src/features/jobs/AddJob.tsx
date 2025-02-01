import styles from "./styles/AddEditJob.module.css"
import JobForm from "./components/JobForm";

const AddJob: React.FC = () => {

    return (
        <div className={styles.add_edit_job}>
            <h2>Add Job</h2>
            <JobForm />
        </div>
    );
    
}

export default AddJob;

