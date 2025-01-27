import styles from "./styles/AddEditCompany.module.css"
import CompanyForm from "./components/CompanyForm";

const AddCompany: React.FC = () => {

    return (
        <div className={styles.add_edit_company}>
            <h2>Add Company</h2>
            <CompanyForm />
        </div>
    );
    
}

export default AddCompany;

