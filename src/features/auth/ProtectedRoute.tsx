import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({ redirectPath = "/" }) => {

    const cookies = new Cookies();
    const token = cookies.get("token");

    return token ? <Outlet /> : <Navigate to={redirectPath} replace />;

}

export default ProtectedRoute;