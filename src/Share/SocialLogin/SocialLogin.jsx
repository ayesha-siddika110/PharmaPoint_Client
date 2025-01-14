import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <>
        <p className='divider pt-8 pb-6'>OR</p>
        
        <div className='flex justify-center items-center gap-6'>
            <div className='text-xl px-2 bg-white  flex items-center space-x-2'><FcGoogle /> <span className='text-lg font-semibold'>Google</span></div>
            <div className='text-xl px-2 bg-sky-500 text-white  flex items-center space-x-2'><FaTwitter /><span className='text-lg font-semibold'>Twitter</span></div>
            <div className='text-xl px-2 bg-white  flex items-center space-x-2'><FaGithub /><span className='text-lg font-semibold'>Github</span></div>
            {/* <div></div> */}
        </div>
        </>
    );
};

export default SocialLogin;