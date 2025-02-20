import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css"

const AuthLayout: React.FC = () => {
    return (
        <div className={styles.auth_layout}>
            {/* <header> */}
                <nav >
                    <h2>Welcome to Ekin Overseas Limited</h2>
                    {/* <Link to="/login">Login</Link><br />
                    <Link to="/signup">Signup</Link> */}
                </nav>
            {/* </header> */}
            <main><Outlet /></main>
            <footer>
                <h2>This is auth footer</h2>
            </footer>
        </div>
    );
}

export default AuthLayout;