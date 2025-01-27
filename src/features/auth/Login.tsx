import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RootState } from "../../store";
import { updateState } from "./authReducer";
import { login } from "../../services/auth";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./Login.module.css";
import TextInput from "../../components/inputs/TextInput";
import { Button } from "../../components/buttons/Button";
import ValidationErrorMessage from "../../components/messages/ValidationErrorMessage";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const { email, password } = authState;
    
    const [loading, setLoading] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(updateState({ name, value }))
    }

    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        
        const cookies = new Cookies()

        if(!email || !password) {
            setValidationError(true);
            return;
        }

        setLoading(true);

        try {

            const { token } = await login({ email, password });
            console.log(token);
    
            const cookieOptions = {
                path: "/", 
                secure: true, 
                maxAge: 86400
            };
            cookies.set("token", token, cookieOptions);

            setLoading(false);

            navigate(`/users`);

        } catch(error: any) {
            console.log(error);
            const { message } = handleApiError(error);
            setErrorMsg(message);
            setLoading(false);
        }

    }

    console.log(authState)

    return (
        <div className={styles.login}>
            <form className={styles.login_form} onSubmit={handleLogin}>
                <div className={styles.login_form_text}>
                    <h2>Welcome back!</h2>
                    <p>Please enter your credentials</p>
                </div>
                <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    error={validationError}
                    errorMsg="email is required"
                    onChange={handleChange}
                />
                <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    error={validationError}
                    errorMsg="password is required"
                    onChange={handleChange}
                />
                {
                    errorMsg
                    ?
                    <ValidationErrorMessage 
                        message={errorMsg}
                    />
                    :
                    null
                }
                <div className={styles.login_submit_button}>
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );

}

export default Login;