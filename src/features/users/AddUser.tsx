import styles from "./styles/AddEditUser.module.css"
import UserForm from "./components/UserForm";

const AddUser: React.FC = () => {

    return (
        <div className={styles.add_edit_user}>
            <h2>Add User</h2>
            <UserForm />
        </div>
    );
    
}

export default AddUser;

