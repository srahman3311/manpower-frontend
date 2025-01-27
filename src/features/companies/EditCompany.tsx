import styles from "./styles/AddEditCompany.module.css"
import CompanyForm from "./components/CompanyForm";

const EditCompany: React.FC = () => {

    return (
        <div className={styles.add_edit_company}>
            <h2>Edit Company</h2>
            <CompanyForm />
        </div>
    );
    
}

export default EditCompany;

