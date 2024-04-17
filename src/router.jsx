import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Page/Home/Home";
import DashboardHome from "./Page/Dashboard/DashboardHome/DashboardHome";
import Dashboard from "./Page/Dashboard/Dashboard/Dashboard";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import AddProducts from "./Page/Dashboard/AddProduct/AddProducts";
import Shop from "./Page/Shop/Shop";
import ProductDetails from './Coponents/ProductDetails/ProductDetails'
import CheckOut from "./Coponents/CheckOut/CheckOut";
import Orders from "./Page/Dashboard/Orders/Orders";
import DownloadOrder from "./Page/Dashboard/Orders/DownloadOrder";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path : '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails></ProductDetails>
            },
            {
                path : '/checkout',
                element: <CheckOut></CheckOut>
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
            },
            {
                path : '/dashboard/order',
                element : <Orders></Orders>
            },
            {
                path: '/dashboard/download/order/:orderId',
                element: <DownloadOrder></DownloadOrder>
            }
        ]

    }
]);
export default router