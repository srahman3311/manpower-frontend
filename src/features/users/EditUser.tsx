import styles from "./styles/AddEditUser.module.css"
import UserForm from "./components/UserForm";

const EditUser: React.FC = () => {

    return (
        <div className={styles.add_edit_user}>
            <h2>Edit User</h2>
            <UserForm />
        </div>
    );
    
}

export default EditUser;

