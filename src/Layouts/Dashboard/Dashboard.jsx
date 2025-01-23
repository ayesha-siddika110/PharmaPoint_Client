

import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/Logo/darklogo.png'
import LiElement from './LiElement';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import './styleD.css'
import useRole from '../../Hooks/useRole';
import { MdVerified } from "react-icons/md";

const Dashboard = () => {
    const [role] = useRole()
    // console.log(role.role);
    
    

    return (
        <div className='flex'>
            <ToastContainer />
            <Toaster />

            <div className='w-[20%] bg-[#033B4C] fixed left-0 h-[100vh] overflow-y-scroll overflow-x-hidden'>
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
            <div className='ml-[20%] w-[100%]'>
                <div className='w-full flex justify-end'>

                <p className=' mt-8 mr-[5%] font-semibold p-2 border-2 flex rounded-3xl justify-center items-center gap-2 w-[100px] '><span>{role}</span><MdVerified className='text-[#033B4C]' /></p>
                </div>
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;