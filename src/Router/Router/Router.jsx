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
import Payment from "../../pages/Dashboard/Admin/Payment/Payment";
import SalesReport from "../../pages/Dashboard/Admin/SalesReport/SalesReport";
import BannerAdvertise from "../../pages/Dashboard/Admin/BannerAdvertise/BannerAdvertise";
import SellerHome from "../../pages/Dashboard/Seller/SellerHome/SellerHome";
import ManageMedicine from "../../pages/Dashboard/Seller/ManageMedicine/ManageMedicine";
import PaymentHistory from "../../pages/Dashboard/Seller/PaymentHistory/PaymentHistory";
import AskForAdvertisement from "../../pages/Dashboard/Seller/AskForAdvertisement/AskForAdvertisement";
import UserPaymentHistory from "../../pages/Dashboard/User/UserPaymentHistory/UserPaymentHistory";
import PrivetRouter from "../PrivetRoute/PrivetRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import UserRoute from "../UserRoute/UserRoute";
import AdminHome from "../../pages/Dashboard/Admin/AdminHome/AdminHome";
import Shop from "../../pages/Shop/Shop";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";

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
          path: "/shop",
          element: <Shop></Shop>
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
        {
          path: "/UpdateProfile",
          element: <UpdateProfile></UpdateProfile>
        },

        // payment //make it private
        {
          path: "/carts",
          element: <Carts></Carts>
        },
        {
          path: "/checkout",
          element: <PrivetRouter><Checkout></Checkout></PrivetRouter>
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
       
        // admin route
        {
          path: "/dashboard/adminHome",
          element: <PrivetRouter><AdminRoute><AdminHome></AdminHome></AdminRoute></PrivetRouter>
        },
        {
          path: "/dashboard/manageUsers",
          element: <PrivetRouter><AdminRoute><ManageUser></ManageUser></AdminRoute></PrivetRouter>
        },
        {
          path: "/dashboard/manageCategory",
          element: <PrivetRouter><AdminRoute><ManageCategory></ManageCategory></AdminRoute></PrivetRouter>
        },
        {
          path: "/dashboard/payment",
          element: <PrivetRouter><AdminRoute><Payment></Payment></AdminRoute></PrivetRouter>
        },
        {
          path: "/dashboard/salesReport",
          element: <PrivetRouter><AdminRoute><SalesReport></SalesReport></AdminRoute></PrivetRouter>
        },
        {
          path: "/dashboard/bannerAdvertise",
          element: <PrivetRouter><AdminRoute><BannerAdvertise></BannerAdvertise></AdminRoute></PrivetRouter>
        },
        // seller route
        {
          path: "/dashboard/addProduct",
          element: <PrivetRouter><SellerRoute><AddProduct></AddProduct></SellerRoute></PrivetRouter>
        },
        {
          path: "/dashboard/sellerHome",
          element: <PrivetRouter><SellerRoute><SellerHome></SellerHome></SellerRoute></PrivetRouter>
        },
        {
          path: "/dashboard/manageMedicine",
          element: <PrivetRouter><SellerRoute><ManageMedicine></ManageMedicine></SellerRoute></PrivetRouter>
        },
        {
          path: "/dashboard/paymentHistory",
          element: <PrivetRouter><SellerRoute><PaymentHistory></PaymentHistory></SellerRoute></PrivetRouter>
        },
        {
          path: "/dashboard/askForAdvertisement",
          element: <PrivetRouter><SellerRoute><AskForAdvertisement></AskForAdvertisement></SellerRoute></PrivetRouter>
        },
        // user route
        {
          path: "/dashboard/userPaymentHistory",
          element: <PrivetRouter><UserRoute><UserPaymentHistory></UserPaymentHistory></UserRoute></PrivetRouter>
        },

      ]
    }

  ]);