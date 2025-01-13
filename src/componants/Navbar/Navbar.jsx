import React from 'react';
import { Link } from 'react-router-dom';
import lightlogo from '../../assets/Logo/Lightlogo.png'

const Navbar = () => {
    const links =<>
    <Link to="/"><a href='#'>Home</a></Link>
    <Link to=""  >Shop</Link>
    <Link to="" >Carts</Link>
    <Link to="">Lenguage</Link>
    <Link to="" >Contact</Link>
    
    </>
    return (
        <div>
            <div className='shadowBottom bg-white'  >

                <div className="navbar flex justify-between w-[95%] m-auto h-[70px]">


                    <div className='navbar-start'>
                        <img src={lightlogo} className='w-64' alt="" />
                    </div>

                    <div className="navbar-center hidden lg:flex ">
                        <ul className="menu menu-horizontal px-1 gap-6 text-[14px]">
                            {links}
                        </ul>

                    </div>
                    <div className="navbar-end hidden lg:flex">
                        {/* <a href={cvpdf} target='_black'><button className="hover:bg-indigo-500 border border-indigo-600 shadow-lg shadow-indigo-500/40 py-2 rounded-lg px-4 ">Download CV</button></a> */}
                        <Link className='bg-[#033B4C] text-white py-1 px-4 font-semibold uppercase' >Join Us</Link>
                    </div>

                    <div className="navbar-end drawer drawer-end lg:hidden">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-4" className="drawer-button "><div tabIndex={0} role="button" className="  btn btn-ghost lg:hidden" htmlFor="my-drawer-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                            <ul className="menu bg-white mt-[70px] text-base-content  w-80 p-4 space-y-3" style={{
                                background: 'white',
                                backdropFilter: 'blur( 4.5px )',
                                webkitBackdropFilter: 'blur( 4.5px )',
                                borderRadius: '5px',
                            }}>
                                {/* Sidebar content here */}
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;