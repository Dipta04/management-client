import { createBrowserRouter } from "react-router-dom";
import Addtask from "../Component/Addtask/Addtask";
import Complete from "../Component/Complete/Complete";
import Login from "../Component/Login/Login";
import Mytask from "../Component/Mytask/Mytask";
import Signup from "../Component/Signup/Signup";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/addtask',
                element:<PrivateRoute><Addtask></Addtask></PrivateRoute> 
            },
            {
                path: '/mytask',
                element:<PrivateRoute><Mytask></Mytask></PrivateRoute> 
            },
            {
                path: '/completedTask',
                element: <PrivateRoute><Complete></Complete></PrivateRoute>
            }
        ]
    }
])
export default router;