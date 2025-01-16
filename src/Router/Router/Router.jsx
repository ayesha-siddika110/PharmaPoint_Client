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
        }
        
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
        }
      ]
    }

  ]);