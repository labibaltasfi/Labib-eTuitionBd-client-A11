import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PostTuitions from "../pages/Tuitions/PostTuitions ";
import tuitionList from "../pages/Tuitions/TuitionList";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import UpdateUser from "../pages/Dashboard/UsersManagement/UpdateUser";
import UserDetails from "../pages/Dashboard/UsersManagement/UserDetails";
import TuitionManagement from "../pages/Dashboard/TuitionManagement/TuitionManagement";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import AppliedTutors from "../pages/Dashboard/StudentDashboard/AppliedTutors";
import Home from "../pages/Home/Home";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
       {
        index: true,
        Component: Home
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
       {
        path: "tuition-details/:id",
        Component: TuitionDetails
      },
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'users-management',
        element: <UsersManagement></UsersManagement>
      },
      {
        path: "users-management/:id",
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/updateUser/${params.id}`);
          return res.json();
        },
        element: <UpdateUser></UpdateUser>
      },
      {
        path: "users-management/user-details/:id",
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/updateUser/${params.id}`);
          return res.json();
        },
        element: <UserDetails></UserDetails>
      },
      {
        path: 'tuition-management',
        element: <TuitionManagement></TuitionManagement>
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
      {
        path: 'applied-tutors',
        Component: AppliedTutors
      },
       {
        path: 'payment/:applicationId',
        Component: Payment
      },
       {
        path: 'payment-success',
        Component: PaymentSuccess
      },
    ]
  }
]);