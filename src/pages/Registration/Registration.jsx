import { Link } from 'react-router-dom';
import img2 from '../../assets/banner/Blue And White Modern Pharmacy Services Banner-1.png'
import SocialLogin from '../../Share/SocialLogin/SocialLogin';

const Registration = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${img2})`,
                height: '100vh',
                backgroundSize: 'cover'
            }}


        >
            <div className='w-[95%] h-full m-auto flex justify-center items-center'>

                <form className=' bg-white bg-opacity-30 lg:m-6 w-[100%] md:w-[50%] lg:w-[40%]  lg:p-10 p-5 space-y-5 border'>
                    <p className='text-4xl text-center text-black font-semibold'>Register Now!</p>
                    <div className='form-control'>
                        <p className='text-black'>Email *</p>

                        <input type="email" placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" required />
                    </div>
                    <div className='form-control'>
                        <p className='text-black'>Password *</p>

                        <input type="password" required placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                    </div>
                    <div>
                        <button className='bg-[#033B4C] w-full text-center py-3 text-white mt-3'>Register</button>

                    </div>
                    <SocialLogin></SocialLogin>
                    <Link to="/login" className='hover:underline text-black flex'>Already have an Account ? please  <p className='pl-2 font-semibold'> Login</p></Link>
                </form>
                <div className='lg:w-[50%] '>

                </div>

            </div>
        </div>
    );
};

export default Registration;