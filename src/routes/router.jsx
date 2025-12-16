import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";



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
      }
    ]
  },
]);