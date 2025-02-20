import { lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import PublicRoute from "./features/auth/PublicRoute";
import ProtectedRoute from "./features/auth/ProtectedRoute";

const LoginPage = lazy(() => import("./features/auth/Login"));
const SignupPage = lazy(() => import("./features/users/Signup"));
const CompanyListPage = lazy(() => import("./features/companies/index"));
const AddCompanyPage = lazy(() => import("./features/companies/AddCompany"));
const EditCompanyPage = lazy(() => import("./features/companies/EditCompany"));
const UserListPage = lazy(() => import("./features/users/index"));
const AddUserPage = lazy(() => import("./features/users/AddUser"));
const EditUserPage = lazy(() => import("./features/users/EditUser"));
const AgentListPage = lazy(() => import("./features/agents/index"));
const AddAgentPage = lazy(() => import("./features/agents/AddAgent"));
const EditAgentPage = lazy(() => import("./features/agents/EditAgent"));
const JobListPage = lazy(() => import("./features/jobs/index"));
const AddJobPage = lazy(() => import("./features/jobs/AddJob"));
const EditJobPage = lazy(() => import("./features/jobs/EditJob"));
const PassengerListPage = lazy(() => import("./features/passengers/index"));
const AddPassengerPage = lazy(() => import("./features/passengers/AddPassenger"));
const EditPassengerPage = lazy(() => import("./features/passengers/EditPassenger"));
const ExpenseListPage = lazy(() => import("./features/expenses/index"));
const AddExpensePage = lazy(() => import("./features/expenses/AddExpense"));
const EditExpensePage = lazy(() => import("./features/expenses/EditExpense"));
const RevenueListPage = lazy(() => import("./features/revenues/index"));
const AddRevenuePage = lazy(() => import("./features/revenues/AddRevenue"));
const EditRevenuePage = lazy(() => import("./features/revenues/EditRevenue"));
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
                            path: "/agents",
                            element: <AgentListPage />
                        },
                        {
                            path: "/agents/add-new",
                            element: <AddAgentPage/>
                        },
                        {
                            path: "/agents/edit/:agentId",
                            element: <EditAgentPage/>
                        },
                        {
                            path: "/jobs",
                            element: <JobListPage />
                        },
                        {
                            path: "/jobs/add-new",
                            element: <AddJobPage/>
                        },
                        {
                            path: "/jobs/edit/:jobId",
                            element: <EditJobPage/>
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
                            path: "/passengers",
                            element: <PassengerListPage />
                        },
                        {
                            path: "/passengers/add-new",
                            element: <AddPassengerPage/>
                        },
                        {
                            path: "/passengers/edit/:passengerId",
                            element: <EditPassengerPage/>
                        },
                        {
                            path: "/expenses",
                            element: <ExpenseListPage />
                        },
                        {
                            path: "/expenses/add-new",
                            element: <AddExpensePage/>
                        },
                        {
                            path: "/expenses/edit/:expenseId",
                            element: <EditExpensePage/>
                        },
                        {
                            path: "/revenues",
                            element: <RevenueListPage />
                        },
                        {
                            path: "/revenues/add-new",
                            element: <AddRevenuePage/>
                        },
                        {
                            path: "/revenues/edit/:revenueId",
                            element: <EditRevenuePage/>
                        },
                    ]
                }
            ]
        }
    ]

    const routes = useRoutes(authRoutes);

    return routes;

}

export default AppRouter;