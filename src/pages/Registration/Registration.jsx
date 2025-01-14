import { Link, useNavigate } from 'react-router-dom';
import img2 from '../../assets/banner/Blue And White Modern Pharmacy Services Banner-1.png'
import SocialLogin from '../../Share/SocialLogin/SocialLogin';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Registration = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
    
        console.log(data);

    }
    return (
        <div
            style={{
                backgroundImage: `url(${img2})`,
                
                backgroundSize: 'cover'
            }}
            className='py-10 md:h-[100vh] h-[120vh]'

        >
            <div className=''>

            <p className='cursor-pointer w-20 ml-[7.5%] bg-[#0693be48] flex items-center py-2 px-2 gap-2' onClick={() => navigate(-1)}> <FaArrowLeft /> Back</p>
            </div>
            <div className='w-[95%] h-full m-auto flex justify-center items-center'>

                <form onSubmit={handleSubmit(onSubmit)} className=' bg-white bg-opacity-30 lg:m-6 w-[100%] md:w-[50%] lg:w-[40%]  lg:p-10 p-5 space-y-3 border'>
                    <p className='text-4xl text-center text-black font-semibold'>Register Now!</p>
                    <div className='form-control'>
                        <p className='text-black'>Name *</p>

                        <input {...register("name", {required: true})} type="text" placeholder="Type your name" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white"  />
                    </div>
                    {errors.name && <span className='text-red-600'>This field is required</span>}
                    <div className='form-control'>
                        <p className='text-black'>Photo *</p>

                        <input type="url" placeholder="Enter photo URL" {...register("photo", {required: true})} className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white"  />
                    </div>
                    {errors.photo && <span className='text-red-600'>This field is required</span>}
                    <div className='form-control'>
                        <p className='text-black'>Email *</p>

                        <input type="email" {...register("email", {required: true})} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white"  />
                    </div>
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                    <div className='form-control'>
                        <p className='text-black'>Password *</p>

                        <input type="password" {...register("password", {
                            required: true,
                            pattern: {
                                value:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
                                message:
                                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
                            },
                        })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                    </div>
                    {errors.password && <span className='text-red-600'>This field is required</span>}
                    {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

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