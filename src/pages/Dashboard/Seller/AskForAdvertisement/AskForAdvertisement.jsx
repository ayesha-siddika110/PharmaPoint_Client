
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAdvertise from "../../../../Hooks/useAdvertise";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import axios from "axios";



const AskForAdvertisement = () => {
    const [advertise, refetch, isLoading] = useAdvertise();

    const image_hosting_key = import.meta.env.VITE_ImageBB_apiKey;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] }
        setLoading(true)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        
        const alldata = { ...data, image: res.data.data.display_url }
        console.log(alldata);


        axiosSecure.post('http://localhost:3000/advertise', alldata)
            .then(res => {
                setLoading(false)
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

    console.log(advertise);

    const [advertiseUpdate, setCategoryUpdate] = useState()
    console.log(advertiseUpdate);
    
    // const handleUpdate = (e) => {
    //     e.preventDefault()
    //     const updateData = {
    //         title: e.target.title.value,
    //         image: e.target.image.value,
    //         description: e.target.description.value
    //     }
    //     setLoading(true)

    //     axiosSecure.patch(`/advertise/${advertiseUpdate?._id}`, updateData)
    //     .then(res => {
    //         if(res.data.modifiedCount>0){

    //             document.getElementById("my_modal_update").close();
    //             refetch()
    //             setLoading(false)
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Category Updated Successfully',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
            
    //     })


    // }

    // delete category
    const handleDelete = (id) => {
        setLoading(true)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/advertise/${id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        setLoading(false)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                          refetch()
                    }
                })
            }
          })
    }


    return (
        <div className="w-[90%] m-auto">

            <div className="flex justify-end items-center mt-10 mb-8">
                <div>
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="bg-[#033B4C] text-white py-3 px-4">+ Add Advertisement</button>
                </div>
            </div>
            <table className="table table-zebra ">
                {/* head */}
                <thead className="bg-[#033B4C] rounded-lg text-white">
                    <tr className="h-12 font-normal text-center text-[14px]">
                        <th></th>
                        <th>Photo</th>
                        <th>Title</th>
                        <th>details</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        advertise?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                    <img src={item?.image} alt="" className="w-14 h-12 object-cover " />
                                </td>
                                <td>
                                    <p>{item?.title}</p>
                                </td>
                                <td className="w-[30%]">
                                    <p>{item?.description}</p>
                                </td>
                                <td>
                                    <p>{item?.status}</p>
                                </td>
                                {/* <td>


                                    <p className="bg-green-300  text-green-800 text-center rounded-full py-1 cursor-pointer w-24 m-auto" onClick={() => {
                                        setCategoryUpdate(item),
                                        document.getElementById('my_modal_update').showModal()
                                    }}
                                    >Update</p>
                                </td> */}
                                <td>
                                    <p className="bg-red-300  text-red-800 text-center rounded-full py-1 cursor-pointer  w-24 m-auto" onClick={() => handleDelete(item?._id)} >delete</p>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)} className=' bg-white bg-opacity-30  w-[100%] lg:p-10 p-5 space-y-5'>
                        <p className='text-4xl text-center font-semibold'>Add for Advertise</p>
                        <div className='form-control'>
                            <p className=''>title : *</p>

                            <input {...register("title", { required: true })} type="text" placeholder="enter short title" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" />
                        </div>
                        {errors.category && <span className='text-red-600'>This field is required</span>}
                        <div className='form-control'>
                            <label htmlFor="" className="text-black   pb-2" >Background Image *</label>
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
                            <button className='border border-gray-400 w-full text-center py-3 text-[#033B4C] mt-3'>{loading? <ImSpinner9 className='text-center text-[#033B4C] te w-full animate-spin' /> : "Add"}</button>

                        </div>
                    </form>
                </div>
            </dialog>
            {/* <dialog id="my_modal_update" className="modal">
                <div className="modal-box w-11/12">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleUpdate} className=' bg-white bg-opacity-30  w-[100%] lg:p-10 p-5 space-y-5'>
                        <p className='text-4xl text-center font-semibold'>Update Category</p>
                        <div className='form-control'>
                            <p className=''>Title : *</p>

                            <input type="text" name="title" defaultValue={advertiseUpdate?.category} placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" required />
                        </div>
                        
                        <div className='form-control'>
                            <label htmlFor="" className="text-black   pb-2" >Image *</label>
                            <input
                               
                                className="py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg " name="image" required  defaultValue={advertiseUpdate?.image} />
                        </div>
                        <div className='form-control'>
                            <p className=''>Description *</p>

                            <textarea required name="description" defaultValue={advertiseUpdate?.description}  type="text" placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" />
                        </div>

                        <div>
                        <button className='border border-gray-400 w-full text-center py-3 text-[#033B4C] mt-3'>{loading? <ImSpinner9 className='text-center text-[#033B4C] te w-full animate-spin' /> : "Update"}</button>


                        </div>
                    </form>
                </div>
            </dialog> */}



        </div>
    );
};

export default AskForAdvertisement;