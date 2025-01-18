import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import AddProduct from "../../pages/Dashboard/Seller/addProduct";
import CategoryDatas from "../../pages/CategoryDatas/CategoryDatas";
import Carts from "../../pages/Carts/Carts";
import Checkout from "../../pages/Checkout/Checkout";
import Invoice from "../../pages/Invoice/Invoice";
import ManageUser from "../../pages/Dashboard/Admin/ManageUser/ManageUser";
import ManageCategory from "../../pages/Dashboard/Admin/ManageCategory/ManageCategory";

export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Registration></Registration>
        },
        {
          path: "/category/:category",
          element: <CategoryDatas></CategoryDatas>
        },

        // payment //make it private
        {
          path: "/carts",
          element: <Carts></Carts>
        },
        {
          path: "/checkout",
          element: <Checkout></Checkout>
        },
        {
          path: "/paymentInvoice",
          element: <Invoice></Invoice>
        },

        
      ]
    },
    // dashboard 
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "/dashboard/addProduct",
          element: <AddProduct></AddProduct>
        },
        {
          path: "/dashboard/manageUsers",
          element: <ManageUser></ManageUser>
        },
        {
          path: "/dashboard/manageCategory",
          element: <ManageCategory></ManageCategory>
        },
      ]
    }

  ]);