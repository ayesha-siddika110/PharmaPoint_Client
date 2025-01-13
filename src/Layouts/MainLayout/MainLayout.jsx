import React from 'react';
import Navbar from '../../componants/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import '../../index.css'

const MainLayout = () => {
    return (
        <div className='roboto-font font-semibold'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;