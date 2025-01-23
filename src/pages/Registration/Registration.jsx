import { Link, useNavigate } from 'react-router-dom';
import img2 from '../../assets/banner/Blue And White Modern Pharmacy Services Banner-1.png'
import SocialLogin from '../../Share/SocialLogin/SocialLogin';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const Registration = () => {
    const navigate = useNavigate()
    const image_hosting_key = import.meta.env.VITE_ImageBB_apiKey;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useAxiosPublic()

    const { updateProfileData, signUpWithEmail } = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {

        console.log(data);

        // image hosting 
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        signUpWithEmail(data?.email, data?.password)
            .then(response => {
                console.log(response)

                const updateDatas = {
                    displayName: data?.name,
                    photoURL: res.data.data.display_url
                }
                updateProfileData(updateDatas)
                    .then(response => {
                        console.log(response);
                        const userData = {
                            userName: data?.name,
                            email: data?.email,
                            photo: res.data.data.display_url,
                            role: data?.category
                        }
                        console.log(userData);
                        
                        axiosPublic.post(`/users/${data?.email}`, userData)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.insertedId) {
                                    toast.success('Successfully Register & save to database')
                                }

                            })
                        navigate('/')

                    })
                    .catch(err => {
                        console.log(err);

                    })
            })
            .catch(err => {
                console.log(err);

            })

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

                        <input {...register("name", { required: true })} type="text" placeholder="Type your name" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
                    </div>
                    {errors.name && <span className='text-red-600'>This field is required</span>}
                    <div className='flex items-center gap-4'>
                        <div className='form-control'>
                            <label htmlFor="" className="text-black   pb-2" >Upload Image *</label>
                            <input
                                type="file"
                                className="file-input bg-[#033B4C] text-white file-input-bordered w-full max-w-xs" {...register("image")} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor="" className="font-semibold text-gray-700  pb-2">Category *</label>

                            <select className="select bg-[#033B4C] text-white select-bordered w-full" {...register("category")}>
                                <option disabled selected>Select Role?</option>
                                <option>user</option>
                                <option>seller</option>
                            </select>
                        </div>

                        {errors.image && <span className='text-red-600'>This field is required</span>}
                    </div>

                    <div className='form-control'>
                        <p className='text-black'>Email *</p>

                        <input type="email" {...register("email", { required: true })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-[#033B4C] text-white" />
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