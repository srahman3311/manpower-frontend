import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { UserRole } from "../types/User";
import { UserRequestBody } from "../types/UserState";
import { updateState, addNewUserInfo } from "../slices/userReducer";
import { createUser, editUser } from "../../../services/users";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import styles from "../styles/AddEditUser.module.css";
import TextInput from "../../../components/inputs/TextInput";
import FileInput from "../../../components/inputs/FileInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const UserForm: React.FC = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userState = useSelector((state: RootState) => state.userState);
    const { newUserInfo } = userState; 
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if(userId) return;
        dispatch(updateState({
            name: "newUserInfo",
            value: {
                ...newUserInfo,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                role: ""
            }
        }));
    }, [userId])

    const uploadProfilePhoto = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        dispatch(updateState({
            name: "profilePhoto",
            value: event.target.files[0]
        }));
    }, [dispatch, updateState])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewUserInfo({ name, value }))
    }, [dispatch, addNewUserInfo])

    const selectRole = useCallback((role: { id: number, title: UserRole }) => {
        dispatch(addNewUserInfo({
            name: "role",
            value: role.title
        }))
    }, [dispatch, addNewUserInfo])

    const saveUser = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            firstName,
            lastName,
            email,
            phone, 
            role,
            password,
            password2,
        } = newUserInfo;

        if(
            !firstName ||
            !lastName ||
            !email ||
            !role
        ) {
            setValidationError(true);
            return;
        }

        if(!userId) {
            if(!password || !password2) {
                setValidationError(true);
                return;
            } 
            const { isPassValid, passValMessage } = validatePassword(password, password2);
            if(!isPassValid) {
                setValidationErrorMsg(passValMessage);
                return;
            }
        }

        if(userId && password) {
            if(!password2) {
                setValidationError(true);
                return;
            }
            const { isPassValid, passValMessage } = validatePassword(password, password2);
            if(!isPassValid) {
                setValidationErrorMsg(passValMessage);
                return;
            }
        }

        let requestBody: UserRequestBody = {
            firstName,
            lastName,
            email,
            password,
            roles: [role],
            permissions: ["read", "write", "delete"]
        };

        if(phone) {
            requestBody.phone = phone;
        } 

        try {
            if(userId) {
                await editUser(userId, requestBody)
            } else {
                await createUser(requestBody);
            }
            navigate("/users")
        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
            console.log(error);
        }

    }, [newUserInfo, navigate, setValidationError, validatePassword, createUser, editUser])

    return (
        <form className={styles.user_form} onSubmit={saveUser}>
            <div className={styles.photo_input}>
                <FileInput 
                    handleFile={uploadProfilePhoto}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="First Name"
                    name="firstName"
                    placeholder="John"
                    value={newUserInfo.firstName}
                    error={validationError}
                    errorMsg="first name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Last Name"
                    name="lastName"
                    placeholder="Doe"
                    value={newUserInfo.lastName}
                    error={validationError}
                    errorMsg="last name is required"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                required={true}
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={newUserInfo.email}
                error={validationError}
                errorMsg="email is required"
                onChange={handleChange}
            />
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Phone"
                    name="phone"
                    placeholder="+8801717062884"
                    value={newUserInfo.phone}
                    error={validationError}
                    errorMsg="email is required"
                    onChange={handleChange}
                />
                <DropdownList 
                    label={"Role"}
                    required={true}
                    data={[
                        { id: 1, title: UserRole.Admin },
                        { id: 2, title: UserRole.Director },
                        { id: 3, title: UserRole.Manager },
                        { id: 4, title: UserRole.Basic },
                    ]}
                    nameKey="title"
                    selectedValue={newUserInfo.role}
                    onClick={selectRole}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Password"
                    type="password"
                    name="password"
                    value={newUserInfo.password}
                    error={validationError}
                    errorMsg="password is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Confirm Password"
                    type="password"
                    name="password2"
                    value={newUserInfo.password2}
                    error={validationError}
                    errorMsg="confirmation password is required"
                    onChange={handleChange}
                />
            </div>
            {
                validationErrorMsg
                ?
                <ValidationErrorMessage 
                    message={validationErrorMsg}
                />
                :
                null
            }
            <div className={styles.save_btn_container}>
                <Button type="submit">
                    Submit
                </Button>
            </div>
        </form>
    );
    
}

export default UserForm;

