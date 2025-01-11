import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
    return (
        <div>
            <header>
               <h2>Manpower Management System</h2>
            </header>
            <main><Outlet /></main>
            <footer>
                <h2>This is the footer</h2>
            </footer>
        </div>
    );
}

export default MainLayout;