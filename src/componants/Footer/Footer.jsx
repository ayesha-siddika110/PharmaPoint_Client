import React from 'react';
import logo from '../../assets/Logo/darklogo.png'

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 mt-20">
            <div className="container mx-auto px-4">
                <div className="lg:flex justify-between w-full">
                    {/* Left Section */}
                    <div className="mb-6 md:w-[50%] md:mb-0">
                        <img src={logo} alt="" />
                        <p className="text-sm mt-2 tracking-[10px]">The heart of Medicine</p>

                    </div>

                    {/* Center Section */}
                    <div className="lg:flex lg:space-y-0 space-y-5 lg:space-x-12 mb-6 md:mb-0 md:w-[50%]">
                        <div className='w-[40%]'>
                            <h3 className="font-semibold mb-4">More PharmaPoint</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-gray-400">Media</a></li>
                                <li><a href="#" className="hover:text-gray-400">Events</a></li>
                                <li><a href="#" className="hover:text-gray-400">Programs</a></li>
                                <li><a href="#" className="hover:text-gray-400">Spaces</a></li>

                            </ul>
                        </div>
                        <div className='w-[60%]'>
                            <h3 className="font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2 text-sm">
                               
                                <p className="text-gray-600">Phone : +880 1125478925</p>
                                <h3 className="text-gray-600 font-normal mb-2">Email : ayeshasiddika777697@gmail.com</h3>
                                <div className='flex gap-2 text-gray-600'>
                                    Address : <p className="text-gray-600">
                                    123 Main Street, <br />
                                    Dinajpur, Bangladesh
                                </p>
                                </div>
                                


                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}

            </div>
            <div className="mt-8 text-center border-t border-gray-700 pt-4">
                <p className="text-sm">
                    A Medicine Selling company
                </p>
                <p className="text-sm mt-2">
                    Copyright © 2023—2029, The Next Web B.V. Made with <span className="text-red-500">❤️</span> in PharmaPoint.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
