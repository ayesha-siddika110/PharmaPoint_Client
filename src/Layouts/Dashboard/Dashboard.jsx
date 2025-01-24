

import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/Logo/darklogo.png'
import LiElement from './LiElement';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import './styleD.css'
import useRole from '../../Hooks/useRole';
import { MdVerified } from "react-icons/md";
import { FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { CiBoxList } from "react-icons/ci";
const Dashboard = () => {
    const [role] = useRole()
    // console.log(role.role);
    const links = <>
     <div className='md:w-[20%] w-[70%]  bg-[#033B4C] fixed left-0 h-[100vh] overflow-y-scroll overflow-x-hidden'>
                {/* logo */}
                <Link to='/'>
                    <img src={logo} className='w-[80%] m-auto object-contain pt-6' alt="" />
                </Link>

                <div>
                    <ul className='text-white  pl-6 mt-28 flex flex-col'>

                        {/* admin route */}
                        {role === 'admin' && <>
                            <NavLink to="/dashboard/adminHome"><LiElement name={"Admin Home"}></LiElement></NavLink>

                            <NavLink to="/dashboard/manageUsers"><LiElement name={"Manage Users"}></LiElement></NavLink>

                            <NavLink to="/dashboard/manageCategory"><LiElement name={"Manage Category"}></LiElement></NavLink>

                            <NavLink to="/dashboard/payment"><LiElement name={"Payment"}></LiElement></NavLink>

                            <NavLink to="/dashboard/salesReport"><LiElement name={"Sales Report"}></LiElement></NavLink>

                            <NavLink to="/dashboard/bannerAdvertise"><LiElement name={"Banner Advertise"}></LiElement></NavLink>


                        </>}

                        {/* seller route */}

                        {
                            role === 'seller' && <>
                                <NavLink to="/dashboard/sellerHome"><LiElement name={"Seller Home"}></LiElement></NavLink>
                                <NavLink to="/dashboard/addProduct"><LiElement name={"Add Product"}></LiElement></NavLink>
                                <NavLink to="/dashboard/manageMedicine"><LiElement name={"Manage Medicine"}></LiElement></NavLink>
                                <NavLink to="/dashboard/paymentHistory"><LiElement name={"Payment History"}></LiElement></NavLink>
                                <NavLink to="/dashboard/askForAdvertisement"><LiElement name={"Ask For Advertisement"}></LiElement></NavLink>

                            </>
                        }

                        {/* user route */}
                        {
                            role === 'user' && <>
                                <NavLink to="/dashboard/userPaymentHistory"><LiElement name={"User Payment History"}></LiElement></NavLink>
                            </>
                        }

                    </ul>
                </div>


            </div>
    
    </>



    return (
        <div className='flex'>
            <ToastContainer />
            <Toaster />
            <Helmet>
                <link rel="icon" href="../../assets/Logo/favicon.png" />
                <title>Dashboard - PharmaPoint</title>
            </Helmet>
            <div className='hidden lg:flex'>
                {links}
            </div>

           
            <div className="drawer md:hidden flex z-50">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button absolute top-0"><CiBoxList className='text-5xl p-2 border-2 rounded-full mt-7'  /></label>
                    {/* Page content here */}
                    {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <>

                    {links}
                    </>
                </div>
            </div>
            <div className='md:ml-[25%] w-[100%]'>
                <div className='w-full flex justify-between'>

                    <Link to="/" className=' mt-8  font-semibold p-2 border-2 flex rounded-3xl justify-center items-center ml-[15%] md:ml-[4%] gap-2 w-[100px] '><FaArrowLeft></FaArrowLeft><span>Home</span></Link>
                    <p className=' mt-8 mr-[5%]  font-semibold p-2 border-2 flex rounded-3xl justify-center items-center gap-2 w-[100px] '><span>{role}</span><MdVerified className='text-[#033B4C]' /></p>
                </div>
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;