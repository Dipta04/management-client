import { createBrowserRouter } from "react-router-dom";
import Addtask from "../Component/Addtask/Addtask";
import Complete from "../Component/Complete/Complete";
import Login from "../Component/Login/Login";
import Mytask from "../Component/Mytask/Mytask";
import Signup from "../Component/Signup/Signup";
import Main from "../Layout/Main";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children: [
            {
                path: '/signin',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/addtask',
                element: <Addtask></Addtask>
            },
            {
                path: '/mytask',
                element: <Mytask></Mytask>
            },
            {
                path: '/completedTask',
                element: <Complete></Complete>
            }
        ]
    }
])
export default router;