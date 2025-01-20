import React from 'react';
import spinlogo from '../../assets/Logo/spin.png'

const LoadingSign = () => {
    return (
        <div>
            <div className="flex justify-center items-center" style={{ height: '100vh' }}>
                <img src={spinlogo} className='w-24 animate-spin' alt="loading" />


            </div>
        </div>
    );
};

export default LoadingSign;