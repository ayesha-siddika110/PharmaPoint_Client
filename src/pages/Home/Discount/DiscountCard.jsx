import React from 'react';

const DiscountCard = () => {
    return (
        <div className='h-[400px] p-5 shadow-sm shadow-black border'>
            <img className='w-full h-[250px] object-cover' src="https://i.ibb.co.com/mBG9t2c/hospital-care-sale-banner-template-23-2151151381.jpg" alt="" />
            <div className='flex justify-between  pt-2'>
                <p className='text-2xl'>Medicine name</p>
                <p className='text-lg font-semibold text-orange-500'>20% Off</p>
            </div>
            <p>Company: Squire</p>
        </div>
    );
};

export default DiscountCard;