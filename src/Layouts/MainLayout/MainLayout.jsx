import Navbar from '../../componants/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import '../../index.css'
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import Footer from '../../componants/Footer/Footer';

const MainLayout = () => {
    const location = useLocation()
    const path = location.pathname === '/login' || location.pathname === '/register'
    return (
        <div className='roboto-font font-semibold'>
            <ToastContainer />
            <Toaster/>
            {path || <Navbar></Navbar>}
            <div className='min-h-[80vh]'>

            <Outlet></Outlet>
            </div>
            {path || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;