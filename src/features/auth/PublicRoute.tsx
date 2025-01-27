import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PublicRoute: React.FC<{ redirectPath?: string }> = ({ redirectPath = "/users" }) => {

    const cookies = new Cookies();
    const token = cookies.get("token");

    return token ? <Navigate to={redirectPath} replace /> : <Outlet />;

}

export default PublicRoute;