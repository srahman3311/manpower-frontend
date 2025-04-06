import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { UserRole } from "../types/User";
import { UserRequestBody } from "../types/UserState";
import { updateState, addNewUserInfo, clearUserInfo } from "../slices/userReducer";
import { createUser, editUser } from "../../../services/users";
import { validatePassword } from "../../../utils/validators/validatePassword";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import { uploadFiles } from "../../../utils/file-handlers/uploadFiles";
import { removeFiles } from "../../../utils/file-handlers/removeFiles";
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
    const { 
        newUserInfo,
        profilePhoto, 
        userInAction
    } = userState; 
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
         if(profilePhoto) {
            dispatch(updateState({
                name: "profilePhoto",
                value: null
            }));
        }
        if(userId) return;
        dispatch(clearUserInfo());
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
            balance
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

        let imageUrl: string | undefined;

        if(profilePhoto) {
        
            // Means user is changing the profilePhoto. So, need to remove the old profilePhoto
            if(userInAction?.imageUrl && profilePhoto) {
                const { success, message } = await removeFiles([userInAction.imageUrl]);
                if(!success) {
                    alert(message);
                    return;
                }
            }

            const { urls, errorMessage } = await uploadFiles([profilePhoto], "users");
    
            if(errorMessage) {
                alert(errorMessage);
                return;
            }

            if(urls.length > 0) {
                imageUrl = urls[0].url
            }

        }
        
        let requestBody: UserRequestBody = {
            firstName,
            lastName,
            email,
            password,
            imageUrl,
            balance: balance !== "" ? Number(balance) : 0,
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
            /*
                Only if user has no photo and user uploaded one just now we need to remove it.
                If user was trying to replace then we keep the replaced photo. This is rarely going
                to happen so if user changed the photo but edit was not successful then don't bother
            */
            if(imageUrl && !userInAction?.imageUrl) {
                await removeFiles([imageUrl]);
            }
            console.log(error);
        }

    }, [
        userId,
        newUserInfo, 
        profilePhoto,
        userInAction,
        uploadFiles,
        removeFiles,
        navigate, 
        setValidationError, 
        setValidationErrorMsg,
        handleApiError,
        validatePassword, 
        createUser, 
        editUser
    ])

    return (
        <form className={styles.user_form} onSubmit={saveUser}>
            <div className={styles.photo_input}>
                <FileInput 
                    file={profilePhoto}
                    imageUrl={userInAction?.imageUrl ?? ""}
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
            <TextInput
                label="Cash In Hand"
                name="balance"
                value={newUserInfo.balance}
                onChange={handleChange}
            />
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

