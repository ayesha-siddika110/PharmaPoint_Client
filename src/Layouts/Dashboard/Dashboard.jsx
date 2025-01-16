
import useAdmin from '../../Hooks/useAdmin';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/Logo/darklogo.png'
import LiElement from './LiElement';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin()

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
                    <ul className='text-white  pl-6 mt-8'>
                        {
                            isAdmin && <>
                                <Link><LiElement name={"Admin Home"}></LiElement></Link>

                                <Link><LiElement name={"Manage Users"}></LiElement></Link>

                                <Link><LiElement name={"Manage Category"}></LiElement></Link>

                                <Link><LiElement name={"Payment"}></LiElement></Link>

                                <Link><LiElement name={"Sales Report"}></LiElement></Link>

                                <Link><LiElement name={"Banner Advertise"}></LiElement></Link>
                            </>
                        }
                                <Link to="/dashboard/addProduct"><LiElement name={"Add Product"}></LiElement></Link>

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