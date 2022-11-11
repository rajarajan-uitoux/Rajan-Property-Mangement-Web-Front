import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Loadable from "../components/General/Loadable";
const MainLayout = Loadable(lazy(() => import("../components/Layout/MainLayout")));
const DashBoard = Loadable(lazy(() => import("../pages/DashBoard/DashBoard")));
const Login = Loadable(lazy(() => import("../pages/Login/Login")));
const AuthenticatedRoute = Loadable(lazy(() => import("./AuthenticatedRoute")));
const LoginLayout = Loadable(lazy(() => import("../components/Layout/LoginLayout")));
const Information = Loadable(lazy(() => import("../pages/Information/Information")));
// const Customer = Loadable(lazy(() => import("../pages/Customer/Customer")));
// const CustomerSummary = Loadable(lazy(() => import("../pages/Customer/CustomerSummary")));
// const ForgetEmailAlert = Loadable(lazy(() => import("../pages/ForgetPassword/Otp")));
// const ForgetPassword = Loadable(lazy(() => import("../pages/ForgetPassword/ForgetPassword")));
// const ResetPassword = Loadable(lazy(() => import("../pages/ResetPassword/ResetPassword")));
// const LoginRoute = Loadable(lazy(() => import("./LoginRoute")));
// const Otp = Loadable(lazy(() => import("../pages/ForgetPassword/Otp")));

export const routes = [
  {
    path: "/",
    element: <AuthenticatedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <DashBoard />,
          },
        ],
      },
      // {
      //   path: "customer",
      //   element: <MainLayout />,
      //   children: [
      //     {
      //       path: "",
      //       element: <Customer />,
      //     },
      //     {
      //       path: ":id",
      //       element: <CustomerSummary />,
      //     },
      //   ],
      // },

      {
        path: "/information",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Information />,
          },
        ],
      },
    ],
  },
  /* Login Routes*/
  {
    path: "",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        
      },
      // {
      //   path: "/forgot-password",
      //   element: <ForgetPassword />,
      // },
      // {
      //   path: "/forgot",
      //   element: <Otp />,
      // },
      // {
      //   path: `/resetPassword`,
      //   element: <ResetPassword />,
      // },
    ],
  },
];
export default function Routes() {
  return useRoutes(routes);
}
