

import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/Logo/darklogo.png'
import LiElement from './LiElement';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import './styleD.css'
import useRole from '../../Hooks/useRole';

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
                    <img src={logo} className='w-full object-contain pt-6' alt="" />
                </Link>

                <div>
                    <ul className='text-white  pl-6 mt-8 flex flex-col'>
                        <p className='text-red-600'>admin route</p>
                        
                        {role === 'admin' && <>
                            <Link><LiElement name={"Admin Home"}></LiElement></Link>

                            <NavLink to="/dashboard/manageUsers"><LiElement name={"Manage Users"}></LiElement></NavLink>

                            <NavLink to="/dashboard/manageCategory"><LiElement name={"Manage Category"}></LiElement></NavLink>

                            <NavLink to="/dashboard/payment"><LiElement name={"Payment"}></LiElement></NavLink>

                            <NavLink to="/dashboard/salesReport"><LiElement name={"Sales Report"}></LiElement></NavLink>

                            <NavLink to="/dashboard/bannerAdvertise"><LiElement name={"Banner Advertise"}></LiElement></NavLink>


                        </>}


                        <p className='text-red-600'>seller route</p>
                        {
                            role === 'seller' && <>
                                <NavLink to="/dashboard/sellerHome"><LiElement name={"Seller Home"}></LiElement></NavLink>
                                <NavLink to="/dashboard/addProduct"><LiElement name={"Add Product"}></LiElement></NavLink>
                                <NavLink to="/dashboard/manageMedicine"><LiElement name={"Manage Medicine"}></LiElement></NavLink>
                                <NavLink to="/dashboard/paymentHistory"><LiElement name={"Payment History"}></LiElement></NavLink>
                                <NavLink to="/dashboard/askForAdvertisement"><LiElement name={"Ask For Advertisement"}></LiElement></NavLink>

                            </>
                        }

                        <p className='text-red-600'>user route</p>
                        {
                            role === 'user' && <>
                                <NavLink to="/dashboard/userPaymentHistory"><LiElement name={"User Payment History"}></LiElement></NavLink>
                            </>
                        }

                    </ul>
                </div>


            </div>
            <div className='ml-[20%] w-[100%]'>
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;