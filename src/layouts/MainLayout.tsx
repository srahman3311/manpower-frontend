import { Outlet } from "react-router-dom";
import SideBar from "./mainLayout/SideBar";

const MainLayout: React.FC = () => {
    return (
        <div>
            <header>
                <nav>
                    <menu>
                        <SideBar />
                    </menu>
                </nav>
            </header>
            <main><Outlet /></main>
            <footer>
                <h2>This is the footer</h2>
            </footer>
        </div>
    );
}

export default MainLayout;