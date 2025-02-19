import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/banner/Blue And White Modern Pharmacy Services Banner.png'
import SocialLogin from '../../Share/SocialLogin/SocialLogin';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';



const Login = () => {
    const navigate = useNavigate()
    const {signInwithEmail} = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => {

        signInwithEmail(data?.email, data?.password)
        .then(res=>{

            toast.success('Sign In')
            navigate("/")            
        })
        .catch(err=>{
            console.log(err); 
        })

    }
        const [userCre, setUseCre] = useState(true)
        const [admin, setAdmin] = useState(false)
    const handleCredential = (Credential)=>{
        console.log(Credential);
        if(Credential === 'user'){
            setUseCre(true)
            setAdmin(false)
        }
        if(Credential === 'admin'){
            setAdmin(true)
            setUseCre(false)
            
        }
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
                    <div className=' divider py-6 text-center font-semibold'>Select Credential</div>
                    <div className='flex items-center justify-center gap-4'>

                    <button className={`border rounded-full border-[#033B4C] hover:border-black ${userCre && 'bg-black text-white'}  mt-2 p-1 px-4`} onClick={() => handleCredential('user')}>User Credential</button>

                    <button className={`border rounded-full border-[#033B4C] hover:border-black ${admin && 'bg-black text-white'} mt-2 p-1 px-4`} onClick={() => handleCredential('admin')}>Admin Credential</button>

                    </div>
                    <div className=' divider py-6 text-center font-semibold'>Or Normal User</div>
                    <div className='form-control'>
                        <p className='text-white'>Email *</p>
                        {
                            admin ? <input {...register("email", { required: true })} type="email" defaultValue={"ayeshaadmin123@gmail.com"} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                        : <input {...register("email", { required: true })} type="email" placeholder="Type here" defaultValue={""} className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                        }

                    </div>
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                    <div className='form-control'>
                        <p className='text-white'>Password *</p>
                        {
                            admin? <input {...register("password", { required: true })} type="password" placeholder="Type here" defaultValue={"AYEsha123@#"} className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" /> : 
                            <input {...register("password", { required: true })} type="password" placeholder="Type here" defaultValue={""} className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                        }

                        
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