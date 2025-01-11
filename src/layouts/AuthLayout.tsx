import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css"

const AuthLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <header>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </nav>
            </header>
            <main><Outlet /></main>
            <footer>
                <h2>This is auth footer</h2>
            </footer>
        </div>
    );
}

export default AuthLayout;