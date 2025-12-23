import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PostTuitions from "../pages/Tuitions/PostTuitions ";
import tuitionList from "../pages/Tuitions/TuitionList";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import UserDetails from "../pages/Dashboard/UsersManagement/UserDetails";
import TuitionManagement from "../pages/Dashboard/TuitionManagement/TuitionManagement";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import AppliedTutors from "../pages/Dashboard/StudentDashboard/AppliedTutors";
import Home from "../pages/Home/Home";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import ErrorPage from "../Error/ErrorPage";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import UpdateUserByAdmin from "../pages/Dashboard/UsersManagement/UpdateUserByadmin";
import UpdateUser from "../pages/Dashboard/UsersManagement/UpdateUser";
import MyApplications from "../pages/Dashboard/TutorDashboard/MyApplications";
import StudentRoute from "./StudentRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
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
        element: <PrivateRoute></PrivateRoute>
      },
       {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
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
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      },
      {
        path: "users-management/:id",
        loader: async ({ params }) => {
          const res = await fetch(`https://labib-e-tuition-bd-server-a11.vercel.app/updateUser/${params.id}`);
          return res.json();
        },
         element: <AdminRoute><UpdateUserByAdmin></UpdateUserByAdmin></AdminRoute>
      },
      {
        path: "users-management/user-details/:id",
        loader: async ({ params }) => {
          const res = await fetch(`https://labib-e-tuition-bd-server-a11.vercel.app/updateUser/${params.id}`);
          return res.json();
        },
         element: <AdminRoute><UserDetails></UserDetails></AdminRoute>
      },
      {
        path: 'tuition-management',
        element: <AdminRoute><TuitionManagement></TuitionManagement></AdminRoute>
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
        element: <StudentRoute><AppliedTutors></AppliedTutors></StudentRoute>
      },
       {
        path: 'payment/:applicationId',
        Component: Payment
      },
       {
        path: 'payment-success',
        element: <StudentRoute><PaymentSuccess></PaymentSuccess></StudentRoute>
      },
       {
        path: 'payments-history',
        element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
      },
       {
        path: 'profile-setting',
        element: <StudentRoute><UpdateUser></UpdateUser></StudentRoute>
      },
       {
        path: 'my-applications',
        Component: MyApplications
      },
    ]
  }
]);