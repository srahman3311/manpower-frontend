import { lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import PublicRoute from "./features/auth/PublicRoute";
import ProtectedRoute from "./features/auth/ProtectedRoute";

const LoginPage = lazy(() => import("./features/auth/Login"));
const SignupPage = lazy(() => import("./features/users/Signup"));
const JobPage = lazy(() => import("./features/jobs/index"));
const CompanyListPage = lazy(() => import("./features/companies/index"));
const AddCompanyPage = lazy(() => import("./features/companies/AddCompany"));
const EditCompanyPage = lazy(() => import("./features/companies/EditCompany"));
const UserListPage = lazy(() => import("./features/users/index"));
const AddUserPage = lazy(() => import("./features/users/AddUser"));
const EditUserPage = lazy(() => import("./features/users/EditUser"));
const ProfilePage = lazy(() => import("./features/profile/index"));

const AppRouter = () => {

    const authRoutes: RouteObject[] = [
        {
            element: <PublicRoute/>,
            children: [
                {
                    element: <AuthLayout />,
                    children: [
                        {
                            path: "/",
                            element: <LoginPage />
                        },
                        {
                            path: "/signup",
                            element: <SignupPage />
                        }
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    element: <MainLayout />,
                    children: [
                        {
                            path: "/profile/:userId",
                            element: <ProfilePage />
                        },
                        {
                            path: "/users",
                            element: <UserListPage />
                        },
                        {
                            path: "/users/add-new",
                            element: <AddUserPage/>
                        },
                        {
                            path: "/users/edit/:userId",
                            element: <EditUserPage/>
                        },
                        {
                            path: "/companies",
                            element: <CompanyListPage />
                        },
                      
                        {
                            path: "/companies/add-new",
                            element: <AddCompanyPage/>
                        },
                        {
                            path: "/companies/edit/:companyId",
                            element: <EditCompanyPage/>
                        },
                        {
                            path: "/jobs",
                            element: <JobPage />
                        }
                    ]
                }
            ]
        }
    ]

    const routes = useRoutes(authRoutes);

    return routes;

}

export default AppRouter;