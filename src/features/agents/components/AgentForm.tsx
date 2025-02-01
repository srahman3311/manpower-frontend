import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { AgentCategory } from "../types/Agent";
import { NewAgentInfo } from "../types/AgentState";
import { updateState, addNewAgentInfo } from "../slices/agentReducer";
import { createAgent, editAgent } from "../../../services/agents";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";
import styles from "../styles/AddEditAgent.module.css";
import TextInput from "../../../components/inputs/TextInput";
import FileInput from "../../../components/inputs/FileInput";
import { Button } from "../../../components/buttons/Button";
import { DropdownList } from "../../../components/dropdown-list/DropdownList";
import ValidationErrorMessage from "../../../components/messages/ValidationErrorMessage";

const AgentForm: React.FC = () => {

    const { agentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const agentState = useSelector((state: RootState) => state.agentState);
    const { newAgentInfo } = agentState; 
    const [validationError, setValidationError] = useState<boolean>(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if(agentId) return;
        dispatch(updateState({
            name: "newAgentInfo",
            value: {
                ...newAgentInfo,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                category: "A",
                address: ""
            }
        }));
    }, [agentId])

    const uploadPhoto = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        dispatch(updateState({
            name: "photo",
            value: event.target.files[0]
        }));
    }, [dispatch, updateState])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(addNewAgentInfo({ name, value }))
    }, [dispatch, addNewAgentInfo])

    const selectCategory = useCallback((category: { id: number, title: AgentCategory }) => {
        dispatch(addNewAgentInfo({
            name: "category",
            value: category.title
        }))
    }, [dispatch, addNewAgentInfo])

    const saveAgent = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const {
            firstName,
            lastName,
            email,
            phone, 
            category,
            address
        } = newAgentInfo;

        if(
            !firstName ||
            !lastName ||
            !phone
        ) {
            setValidationError(true);
            return;
        }

        let requestBody: Partial<NewAgentInfo> = {
            firstName,
            lastName,
            phone,
            category
        };

        if(email) {
            requestBody.email = email;
        } 

        try {
            if(agentId) {
                await editAgent(
                    agentId, 
                    {
                        ...requestBody, 
                        address: { line1: address ?? null }
                    }
                )
            } else {
                await createAgent({
                    ...requestBody,
                    address: { line1: address ?? null }
                });
            }
            navigate("/agents")
        } catch(error) {
            const { message } = handleApiError(error);
            setValidationErrorMsg(message)
            console.log(error);
        }

    }, [newAgentInfo, navigate, setValidationError, createAgent, editAgent])

    console.log(newAgentInfo)

    return (
        <form className={styles.agent_form} onSubmit={saveAgent}>
            <div className={styles.photo_input}>
                <FileInput 
                    handleFile={uploadPhoto}
                />
            </div>
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="First Name"
                    name="firstName"
                    placeholder="John"
                    value={newAgentInfo.firstName}
                    error={validationError}
                    errorMsg="first name is required"
                    onChange={handleChange}
                />
                <TextInput
                    required={true}
                    label="Last Name"
                    name="lastName"
                    placeholder="Doe"
                    value={newAgentInfo.lastName}
                    error={validationError}
                    errorMsg="last name is required"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={newAgentInfo.email}
                onChange={handleChange}
            />
            <div className={styles.flex_input}>
                <TextInput
                    required={true}
                    label="Phone"
                    name="phone"
                    placeholder="+8801717062884"
                    value={newAgentInfo.phone}
                    error={validationError}
                    errorMsg="email is required"
                    onChange={handleChange}
                />
                <DropdownList 
                    label={"Role"}
                    required={true}
                    data={[
                        { id: 1, title: AgentCategory.A },
                        { id: 2, title: AgentCategory.B },
                        { id: 3, title: AgentCategory.C },
                        { id: 4, title: AgentCategory.D }
                    ]}
                    nameKey="title"
                    selectedValue={newAgentInfo.category}
                    onClick={selectCategory}
                />
            </div>
            <TextInput
                label="Address"
                name="address"
                value={newAgentInfo.address}
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

export default AgentForm;

