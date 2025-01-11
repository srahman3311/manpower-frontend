import { useSelector} from "react-redux";
import { RootState } from "../../store";

const Login: React.FC = () => {

    const authState = useSelector((state: RootState) => state.authState);
    console.log(authState)
    
    return (
        <div>
            <h2>Login</h2>
        </div>
    );
}

export default Login;