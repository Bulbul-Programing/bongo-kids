import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Page/Home/Home";
import DashboardHome from "./Page/Dashboard/DashboardHome/DashboardHome";
import Dashboard from "./Page/Dashboard/Dashboard/Dashboard";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import AddProducts from "./Page/Dashboard/AddProduct/AddProducts";


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
        path: '/login',
        element: <Login></Login>
    },
    {
        path : '/register',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/home',
                element: <DashboardHome></DashboardHome>
            },
            {
                path : '/dashboard/addProduct',
                element : <AddProducts></AddProducts>
            }
        ]

    }
]);
export default router