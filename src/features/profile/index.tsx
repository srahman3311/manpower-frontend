import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterUserList } from "../users/slices/userReducer";
import { deleteUser } from "../../services/users";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import UserTable from "../users/components/UserTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";
import Header from "../../components/texts/Header";

const Profile: React.FC = () => {

    const { userId } = useParams();
    const dispatch = useDispatch()
    const authState = useSelector((state: RootState) => state.authState);
    const { user } = authState;

    return (
        <div className={styles.profile}>
           <Header>Profile</Header>
           <p>{user?.firstName}</p>
        </div>
    );
    
}

export default Profile;

