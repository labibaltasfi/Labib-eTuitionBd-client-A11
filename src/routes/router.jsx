import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PostTuitions from "../pages/Tuitions/PostTuitions ";
import tuitionList from "../pages/Tuitions/TuitionList";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
       {
        path: 'register',
        Component: Register
      },
       {
        path: 'login',
        Component: Login
      },
       {
        path: 'PostTuitions',
        element: <PostTuitions></PostTuitions>,
        loader: () => fetch('/location.json').then(res => res.json())
      },
       {
        path: 'tuitionlist',
        Component: tuitionList
      },
      //  {
      //   path: 'tuitionlist/:tuitionId',
      //   Component: tuitionList
      // },
    ]
  },
  {
     path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children:[
       {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'users-management',
        element: <UsersManagement></UsersManagement>
      },
      
    ]
  }
]);