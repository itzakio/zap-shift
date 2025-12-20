import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BeARider from "../pages/BeARider/BeARider";
import PrivateRoute from "./PrivateRoute";
import PasswordReset from "../pages/Auth/PasswordReset";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../DashBoard/MyParcels/MyParcels";
import Payment from "../DashBoard/MyParcels/Payment";
import PaymentSuccess from "../DashBoard/MyParcels/PaymentSuccess";
import PaymentCancelled from "../DashBoard/MyParcels/PaymentCancelled";
import PaymentHistory from "../DashBoard/PaymentTransaction/PaymentHistory";
import ApproveRiders from "../DashBoard/ApproveRiders/ApproveRiders";
import UsersManagement from "../DashBoard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../DashBoard/AssignRider/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedTasks from "../DashBoard/AssignedTasks/AssignedTasks";
import CompletedDeliveries from "../DashBoard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import DashBoardHome from "../DashBoard/DashBoardHome/DashBoardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/parcel-track/:tracking_id",
        element: <ParcelTrack />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <PasswordReset />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardHome/>
      },
      {
        path: "/dashboard/my-parcels",
        element: <MyParcels />,
      },
      {
        path: "/dashboard/payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/dashboard/payment-cancelled",
        element: <PaymentCancelled />,
      },
      // rider only routes
      {
        path: "/dashboard/assigned-tasks",
        element: (
          <RiderRoute>
            <AssignedTasks />
          </RiderRoute>
        ),
      },
      {
        path: "/dashboard/completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },
      // admin only routes
      {
        path: "/dashboard/approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
