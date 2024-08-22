import { createBrowserRouter } from "react-router-dom";



import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Blogs from "../Pages/Blogs/Blogs/Blogs";
import AddBlog from "../Pages/Blogs/AddBlog/AddBlog";
import AddNewCourse from "../Pages/Course/AddNewCourse/AddNewCourse";
import AllCourse from "../Pages/Course/Course/AllCourse";
import UpdateCourse from "../Pages/Course/UpdateCourse/UpdateCourse";
import BlogsDetails from "../Pages/Home/BlogsDetails/BlogsDetails";



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
      },
      {
        path: 'blogsDetails/:id',
        element: <BlogsDetails></BlogsDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/blogs/${params.id}`)
      },
      // course
      {
        path: '/allCourse',
        element: <AllCourse></AllCourse>
      },
      {
        path: 'addCourse',
        element: <AddNewCourse></AddNewCourse>
      },
      {
        path: '/updateCourse/:id',
        element: <UpdateCourse></UpdateCourse>,
        loader: ({ params }) => fetch(`http://localhost:5000/courses/${params.id}`)
      }

    ]
  }
]);
export default router;