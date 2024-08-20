import { createBrowserRouter } from "react-router-dom";



import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";



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
          {
            path: 'about',
            element:<About></About>
          }
         
        ]
    }
]);
export default router;