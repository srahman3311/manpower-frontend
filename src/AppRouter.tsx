import { lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const LoginPage = lazy(() => import("./features/users/Login"));
const SignupPage = lazy(() => import("./features/users/Signup"));
const JobPage = lazy(() => import("./features/jobs/index"));
const CompanyPage = lazy(() => import("./features/companies/index"));

const AppRouter = () => {
  
    const authRoutes: RouteObject[] = [
        {
            element: <AuthLayout />,
            children: [
                {
                    path: "/login",
                    element: <LoginPage />
                },
                {
                    path: "/signup",
                    element: <SignupPage />
                }
            ]
        },
        {
            element: <MainLayout />,
            children: [
                {
                    path: "/companies",
                    element: <CompanyPage />
                },
                {
                    path: "/jobs",
                    element: <JobPage />
                }
            ]
        }
    ]

    const routes = useRoutes(authRoutes);
    
    return routes;

}

export default AppRouter;