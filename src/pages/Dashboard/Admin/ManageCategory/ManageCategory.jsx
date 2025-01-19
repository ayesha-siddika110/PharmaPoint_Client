import { Link } from "react-router-dom";
import useCategory from "../../../../Hooks/useCategory";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { all } from "axios";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

// TODO : update delete category


const ManageCategory = () => {
    const [category, refetch] = useCategory()
    console.log(category);

    const image_hosting_key = import.meta.env.VITE_ImageBB_apiKey;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const alldata = { ...data, image: res.data.data.display_url }
        //    console.log(alldata);


        axiosSecure.post('/category', alldata)
            .then(res => {
                // console.log(res.data);
                refetch()
                reset()
                document.getElementById("my_modal_3").close();
                Swal.fire({
                    icon: 'success',
                    title: 'Category Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })

            })


    }

    const handleUpdate = (user) => {
        console.log(user);
    }
    return (
        <div className="w-[80%] m-auto">
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold text-center my-5">Manage Category</h1>
                <div className="flex justify-end items-center mt-10 mb-8">
                    <div>
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="bg-[#033B4C] text-white py-3 px-4">+ Add Category</button>
                    </div>
                </div>
                <table className="table table-zebra ">
                    {/* head */}
                    <thead className="bg-[#033B4C] rounded-lg text-white">
                        <tr className="h-12 font-normal text-center text-[14px]">
                            <th></th>
                            <th>Photo</th>
                            <th>Info</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>
                                        <img src={user?.image} alt="" className="w-14 h-12 object-cover " />
                                    </td>
                                    <td>
                                        <p>{user?.category}</p>
                                    </td>
                                    <td>


                                        <p className="bg-green-300  text-green-800 text-center rounded-full py-1 cursor-pointer w-24 m-auto" onClick={() => handleUpdate(user)} >Update</p>
                                    </td>
                                    <td>
                                        <p className="bg-red-300  text-red-800 text-center rounded-full py-1 cursor-pointer  w-24 m-auto" >delete</p>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)} className=' bg-white bg-opacity-30  w-[100%] lg:p-10 p-5 space-y-5'>
                        <p className='text-4xl text-center font-semibold'>Add Category</p>
                        <div className='form-control'>
                            <p className=''>Category Name : *</p>

                            <input {...register("category", { required: true })} type="text" placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" />
                        </div>
                        {errors.category && <span className='text-red-600'>This field is required</span>}
                        <div className='form-control'>
                            <label htmlFor="" className="text-black   pb-2" >Upload Image *</label>
                            <input
                                type="file"
                                className="  border border-[#033B4C] rounded-lg file-input-bordered w-full " {...register("image")} />
                        </div>
                        <div className='form-control'>
                            <p className=''>Description *</p>

                            <textarea {...register("description", { required: true })} type="text" placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" />
                        </div>
                        {errors.description && <span className='text-red-600'>This field is required</span>}

                        <div>
                            <button className='bg-[#033B4C] w-full text-center py-3 text-white mt-3'> + Add Category</button>

                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default ManageCategory;