import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/banner/Blue And White Modern Pharmacy Services Banner.png'
import SocialLogin from '../../Share/SocialLogin/SocialLogin';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';



const Login = () => {
    const navigate = useNavigate()
    const {signInwithEmail} = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        signInwithEmail(data?.email, data?.password)
        .then(res=>{
            console.log(res);
            navigate("/")            
        })
        .catch(err=>{
            console.log(err); 
        })

    }
    return (
        <div
            style={{
                backgroundImage: `url(${img1})`,
                height: '100vh',
                backgroundSize: 'cover'
            }}
            className='py-10'


        >
            <div className=''>

                <p className='cursor-pointer w-20 ml-[7.5%] bg-[#ffffffcb] flex items-center py-2 px-2 gap-2' onClick={() => navigate(-1)}> <FaArrowLeft /> Back</p>
            </div>
            <div className='w-[95%] h-full m-auto flex justify-center items-center'>

                <form onSubmit={handleSubmit(onSubmit)} className=' bg-white bg-opacity-30  w-[100%] md:w-[50%] lg:w-[40%]  lg:p-10 p-5 space-y-5'>
                    <p className='text-4xl text-center text-white font-semibold'>Login Now!</p>
                    <div className='form-control'>
                        <p className='text-white'>Email *</p>

                        <input {...register("email", { required: true })} type="email" placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                    </div>
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                    <div className='form-control'>
                        <p className='text-white'>Password *</p>

                        <input {...register("password", { required: true })} type="password" placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                    </div>
                    {errors.password && <span className='text-red-600'>This field is required</span>}
                    {/* {errors.password && <span className='text-red-600'>{errors.password.message}</span>} */}

                    <div>
                        <button className='bg-[#033B4C] w-full text-center py-3 text-white mt-3'>Login</button>

                    </div>
                    <SocialLogin></SocialLogin>
                    <Link to="/register" className='hover:underline text-black flex'>New To Our Site ? please  <p className='pl-2 font-semibold'> Register</p></Link>
                </form>
                <div className='lg:w-[50%] '>

                </div>



            </div>
        </div>
    );
};

export default Login;