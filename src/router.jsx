import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Page/Home/Home";
import DashboardHome from "./Page/Dashboard/DashboardHome/DashboardHome";
import Dashboard from "./Page/Dashboard/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/home',
                element: <DashboardHome></DashboardHome>
            },
        ]

    }
]);
export default router