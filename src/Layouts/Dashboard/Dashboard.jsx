
// import useAdmin from '../../Hooks/useAdmin';
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/Logo/darklogo.png'
import LiElement from './LiElement';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import './styleD.css'

const Dashboard = () => {
    // const [isAdmin, isAdminLoading] = useAdmin()

    return (
        <div className='flex'>
            <ToastContainer />
            <Toaster/>
            <div className='w-[20%] bg-[#033B4C] fixed left-0 h-[100vh]'>
                {/* logo */}
                <div>
                    <img src={logo} className='w-full object-contain pt-6' alt="" />
                </div>

                <div>
                    <ul className='text-white  pl-6 mt-8 flex flex-col'>
                        <p className='text-red-600'>admin route</p>
                        
                                <Link><LiElement name={"Admin Home"}></LiElement></Link>

                                <NavLink to="/dashboard/manageUsers"><LiElement name={"Manage Users"}></LiElement></NavLink>

                                <NavLink to="/dashboard/manageCategory"><LiElement name={"Manage Category"}></LiElement></NavLink>

                                <Link><LiElement name={"Payment"}></LiElement></Link>

                                <Link><LiElement name={"Sales Report"}></LiElement></Link>

                                <Link><LiElement name={"Banner Advertise"}></LiElement></Link>
                          
                        <p className='text-red-600'>seller route</p>
                                <Link to="/dashboard/addProduct"><LiElement name={"Add Product"}></LiElement></Link>
                        <p className='text-red-600'>user route</p>
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