import React from 'react';
import { FaBoxOpen, FaShippingFast, FaShopify, FaStore } from "react-icons/fa";

const SmallCards = () => {
    return (
        <div className='w-[90%] m-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 py-20 gap-10 '>
            <div className='border bg-white flex items-center gap-4 p-3 shadow-lg '>
                <p className='text-5xl text-purple-700'><FaBoxOpen /></p>
                <div>
                    <p className='text-black font-semibold'>Free Treat</p>
                    <p className='text-base'>Include with offer</p>
                </div>
            </div>
            <div className='borde flex items-center gap-4 p-3 shadow-lg bg-white'>
                <p className='text-5xl text-lime-400'><FaShopify /></p>
                <div>
                    <p className='text-black font-semibold'>Shop With Confidance</p>
                    <p className='text-base'>on order over 40$</p>
                </div>
            </div>
            <div className='border flex items-center gap-4 p-3 shadow-lg bg-white'>
                <p className='text-5xl text-orange-500'><FaStore /></p>
                <div>
                    <p className='text-black font-semibold'>Store Locator</p>
                    <p className='text-base'>Store Locator</p>
                </div>
            </div>
            <div className='border flex items-center gap-4 p-3 shadow-lg bg-white'>
                <p className='text-5xl text-lime-700'><FaShippingFast /></p>
                <div>
                    <p className='text-black font-semibold'>Free Shipping</p>
                    <p className='text-base'>on order over 40$</p>
                </div>
            </div>
            
        </div>
    );
};

export default SmallCards;