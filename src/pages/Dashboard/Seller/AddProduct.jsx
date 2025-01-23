import { useState } from 'react';
import DashboardHeading from '../../../Share/dashboardHeading/DashboardHeading';

import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';

const AddProduct = ({refetch}) => {

    const image_hosting_key = import.meta.env.VITE_ImageBB_apiKey;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const [loading, setLoading] = useState(false)


    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {



        // image hosting 
        setLoading(true)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        } );

        const allData = {...data,productPhoto: res.data.data.display_url, sellerName: user?.displayName, sellerEmail: user?.email}
        delete allData.image

        // console.log(allData);
        
        setLoading(true)
        axiosPublic.post('/products', allData)
        .then(resData=>{
            setLoading(false)
            // console.log(resData.data);
            if(resData.data.insertedId){
                toast.success("successfully Add The product")
                refetch()
                reset()
            }
            
            
        })



    }
    console.log(loading);
    
    return (
 


            <>

                <div className='w-full h-full m-auto flex justify-center items-center'>

                    <form onSubmit={handleSubmit(onSubmit)} className=' bg-white bg-opacity-30 lg:m-6 w-[80%]   lg:p-10 p-5 space-y-3 border'>
                        <DashboardHeading title="Add Product"></DashboardHeading>

                        {/* product name */}
                        <div className='form-control'>
                            <p className='text-black'>Name *</p>

                            <input {...register("productName", { required: true })} type="text" placeholder="Product Name" className=" py-3 px-4 input-bordered w-full border border-gray-400 text-[#033B4C]" />
                        </div>
                        {errors.name && <span className='text-red-600'>This field is required</span>}
                        <div className='flex items-center gap-4'>
                            {/* image */}
                            <div className='form-control'>
                                <label htmlFor="" className="text-black   pb-2" >Upload Image *</label>
                                <input
                                    type="file"
                                    className=" border border-gray-400 text-[#033B4C] file-input-bordered w-full max-w-xs" {...register("image")} />
                            </div>
                            {/* category */}
                            <div className='form-control'>
                                <label htmlFor="" className="font-semibold text-gray-700  pb-2">Category *</label>

                                <select className="select border border-gray-400 text-[#033B4C] select-bordered w-full" {...register("category")} required>
                                    <option disabled selected>Select Role?</option>
                                    <option>Tablets</option>
                                    <option>Capsules</option>
                                    <option>Syrups</option>
                                    <option>Powders</option>
                                    <option>Injections</option>
                                    <option>Creams & Ointments</option>
                                    <option>Drops</option>
                                    <option>Suspensions</option>

                                </select>
                            </div>

                            {errors.image && <span className='text-red-600'>This field is required</span>}
                        </div>
                        {/* price */}
                        <div className='form-control'>
                            <p className='text-black'>Price *</p>

                            <input type="number" {...register("price", { required: true })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-gray-400 text-[#033B4C]" />
                        </div>
                        {errors.price && <span className='text-red-600'>This field is required</span>}

                        {/* quantity */}
                        <div className='form-control'>
                            <p className='text-black'>Quantity *</p>

                            <input type="number" {...register("quantity", {
                                required: true,
                                
                            })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-gray-400 text-[#033B4C]" />
                        </div>
                        {errors.quantity && <span className='text-red-600'>This field is required</span>}
                        {/* description */}
                        <div className='form-control'>
                            <p className='text-black'>Description *</p>

                            <textarea type="text" {...register("description", {
                                required: true,
                                
                            })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-gray-400 text-[#033B4C]" />
                        </div>
                        {errors.quantity && <span className='text-red-600'>This field is required</span>}
                        

                        <div>
                            <button className='border border-gray-400 w-full text-center py-3 text-[#033B4C] mt-3'>{loading? <ImSpinner9 className='text-center w-full animate-spin' /> : "Add Product"}</button>

                        </div>

                        
                    </form>

                </div>
            </>

    );
};

export default AddProduct;