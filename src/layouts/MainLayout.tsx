import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState, AppDispatch } from "../store";
import { fetchUser } from "../features/auth/authReducer";
import styles from "./Layout.module.css";
import SideBar from "./main-layout/SideBar";
import ProfileShortcut from "./main-layout/ProfileShortcut";

const MainLayout: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const { user } = authState;

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    const toggleProfileMenu = () => {}

    return (
        <div className={styles.app_layout}>
            <aside className={styles.sidenav}>
                <SideBar />
            </aside>
            <main className={styles.app_content}>
                <nav>
                    <h2>Ekin Overseas Limited</h2>
                    <ProfileShortcut 
                        user={user}
                        toggleProfileMenu={toggleProfileMenu}
                    />
                </nav>
                <section className={styles.outlet}>
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default MainLayout;