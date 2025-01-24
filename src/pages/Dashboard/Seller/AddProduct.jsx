import { useEffect, useState } from 'react';
import DashboardHeading from '../../../Share/dashboardHeading/DashboardHeading';

import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useCategory from '../../../Hooks/useCategory';

const AddProduct = ({ refetch }) => {

    const image_hosting_key = import.meta.env.VITE_ImageBB_apiKey;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    // const {data:category=[]} = useQuery({
    //     queryFn: ['category'],
    //     queryKey: async()=>{
    //         const res = await axiosPublic.get('/category')
    //         return res.data
    //     }
    // })
    // console.log(category);
    const [category, , isLoading] = useCategory()
    // console.log(category);




    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {



        // image hosting 
        setLoading(true)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        });

        const allData = { ...data, productPhoto: res.data.data.display_url, sellerName: user?.displayName, sellerEmail: user?.email }
        delete allData.image

        // console.log(allData);

        setLoading(true)
        axiosPublic.post('/products', allData)
            .then(resData => {
                setLoading(false)
                // console.log(resData.data);
                if (resData.data.insertedId) {
                    toast.success("successfully Add The product")
                    refetch()
                    reset()
                }


            })



    }
    console.log(loading);

    return (



        <>

            <div className=' w-[100%] m-auto  '>

                <form onSubmit={handleSubmit(onSubmit)} className=' bg-white bg-opacity-30 lg:m-6 lg:w-[80%] w-[100%]   lg:p-10 p-5 space-y-3 border'>
                    <DashboardHeading  title="Add Product"></DashboardHeading>

                    {/* product name */}
                    <div className='form-control'>
                        <p className='text-black'>Name *</p>

                        <input {...register("productName", { required: true })} type="text" placeholder="Product Name" className=" py-3 px-4 input-bordered w-full border border-gray-400 text-[#033B4C]" />
                    </div>
                    {errors.name && <span className='text-red-600'>This field is required</span>}
                    <div className=' items-center gap-4'>
                        {/* image */}
                        <div className='form-control'>
                            <label htmlFor="" className="text-black   pb-2" >Upload Image *</label>
                            <input
                                type="file"
                                className=" border border-gray-400 text-[#033B4C] file-input-bordered w-full max-w-xs" {...register("image")} />
                        </div>
                        <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2'>

                        <div className='form-control'>
                            <label htmlFor="" className="font-semibold text-gray-700  pb-2">Category *</label>

                            <select className="select border border-gray-400 text-[#033B4C] select-bordered w-full" {...register("category")} required>
                                <option disabled selected>Select Role?</option>
                                {
                                    category?.map((item, index) => <option key={index} >{item?.category}</option>)
                                }


                            </select>
                        </div>
                        <div className='form-control'>
                            <label htmlFor="" className="font-semibold text-gray-700  pb-2">Company *</label>

                            <select className="select border border-gray-400 text-[#033B4C] select-bordered w-full" {...register("company")} required>
                                <option disabled selected>Select Role?</option>
                                <option value="HealthGuard">HealthGuard Pharmaceuticals</option>
                                <option value="MediCarePlus">MediCare Plus</option>
                                <option value="PharmaTrust">PharmaTrust</option>
                                <option value="CureWell">CureWell Pharmacy</option>
                                <option value="LifeLineMeds">LifeLine Meds</option>
                                <option value="PillPal">PillPal Pharmaceuticals</option>
                                <option value="MediSphere">MediSphere</option>
                                <option value="WellnessHub">WellnessHub</option>
                                <option value="QuickRelief">QuickRelief Meds</option>
                                <option value="PureHealth">PureHealth Pharma</option>
                                <option value="CareFirst">CareFirst Medicines</option>
                                <option value="VitalityRx">Vitality Rx</option>
                                <option value="GreenCure">GreenCure Pharmacy</option>
                                <option value="BetterMed">BetterMed Solutions</option>
                                <option value="HealthBridge">HealthBridge Pharma</option>


                            </select>
                        </div>
                        <div className='form-control'>
                            <label htmlFor="" className="font-semibold text-gray-700  pb-2">Discount *</label>

                            <input type='number' placeholder='like 10% ' className="input border border-gray-400 text-[#033B4C] input-bordered w-full" {...register("discount")} required>
                                


                            </input>
                        </div>
                        </div>
                        {/* category */}

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
                        <button className='border border-gray-400 w-full text-center py-3 text-[#033B4C] mt-3'>{loading ? <ImSpinner9 className='text-center w-full animate-spin' /> : "Add Product"}</button>

                    </div>


                </form>

            </div>
        </>

    );
};

export default AddProduct;