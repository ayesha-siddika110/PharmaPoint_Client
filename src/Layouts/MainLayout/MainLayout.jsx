import Navbar from '../../componants/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import '../../index.css'

const MainLayout = () => {
    const location = useLocation()
    const path = location.pathname === '/login' || location.pathname === '/register'
    return (
        <div className='roboto-font font-semibold'>
            {path || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;