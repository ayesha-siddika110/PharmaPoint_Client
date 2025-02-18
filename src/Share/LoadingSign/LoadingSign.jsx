import React from 'react';
import spinlogo from '../../assets/Logo/spin.png'
import { CircularProgress } from '@mui/material';

const LoadingSign = () => {
    return (
        <div>
            <div className="flex justify-center items-center" style={{ height: '100vh' }}>
                {/* <img src={spinlogo} className='w-24 animate-spin' alt="loading" /> */}


            <p className='flex flex-col justify-center items-center'><CircularProgress thickness={1} /><span>Loading ...</span></p>
            </div>
        </div>
    );
};

export default LoadingSign;