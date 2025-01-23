import React from 'react';
import banner from '../../../assets/banner/medicine.jpg'
import DashboardHeading from '../../../Share/dashboardHeading/DashboardHeading';
import { Link } from 'react-router-dom';

const HowToShop = () => {
    return (
        <div className='w-[90%] m-auto'>
        <DashboardHeading title={"How To Shop Online ? "}></DashboardHeading>
        
        <div className='w-full m-auto  md:flex items-center'>
        <img src={banner} className='md:w-[50%]' alt="" />
        
        
        
        <div className="join join-vertical md:w-[50%]">
            <ul className="steps steps-vertical ">
                <li className="step text-[#033B4C]">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">Step - 1</div>
                    <div className="collapse-content">
                        <p>Go To The Shop Page and select your items which is add to the cart</p>
                    </div>
                </div>
                </li>
                <li className="step text-[#033B4C]">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">Step - 2</div>
                    <div className="collapse-content">
                        <p>Go to the cart page and checkout the product</p>
                    </div>
                </div>
                </li>
                <li className="step text-[#033B4C]">
                    
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">Step - 3</div>
                    <div className="collapse-content">
                        <p>After Check out , wait 2hr to get your order in your home</p>
                    </div>
                </div>
                </li>
                
            </ul>

            <div className='flex justify-end'>
            <Link to="/Shop" className={`bg-[#033B4C] py-2 px-4 text-white uppercase  w-[92%] text-center mt-10`}>Let&apos;s Shop Now</Link>
               
            </div>
        </div>
        </div>

        </div>
    );
};

export default HowToShop;