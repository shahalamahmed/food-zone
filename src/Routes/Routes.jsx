import { createBrowserRouter } from "react-router-dom";



import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
          {
            path: '/',
            element: <Home></Home>
          },
         
          {
            path: 'login',
            element: <Login></Login>
          },
          {
            path: 'signUp',
            element: <SignUp></SignUp>
          },
         
        ]
    }
]);
export default router;