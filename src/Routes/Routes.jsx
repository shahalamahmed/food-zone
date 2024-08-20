import { createBrowserRouter } from "react-router-dom";



import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Blogs from "../Pages/Blogs/Blogs/Blogs";
import AddBlog from "../Pages/Blogs/AddBlog/AddBlog";



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
        element: <About></About>
      },
      // blogs
      {
        path: 'blogs',
        element: <Blogs></Blogs>
      },
      {
        path: 'addBlog',
        element: <AddBlog></AddBlog>
      }

    ]
  }
]);
export default router;