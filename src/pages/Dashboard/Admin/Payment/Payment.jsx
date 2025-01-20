import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import LoadingSign from '../../../../Share/LoadingSign/LoadingSign';
import Swal from 'sweetalert2';

const Payment = () => {
    const axiosSecure = useAxiosSecure()
    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            return res.data
        }
    })
    // console.log(payments);
    if (isLoading) {
        return <LoadingSign></LoadingSign>
    }
    const handleAcceptPayment = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/payments/${id}`, { status: 'paid' })
                .then(res => {
                    
                
                    Swal.fire({
                        title: "payment accepted",
                        text: "This payment has been accepted",
                        icon: "success"
                    });
                    refetch()
                })
                
            }
        });

    }

    return (
        <div>
            <div className="w-[80%] m-auto">
                <div className="overflow-x-auto">
                    <h1 className="text-2xl font-bold text-center mt-20 mb-14">Manage Payments</h1>
                    {/* <div className="flex justify-end items-center mt-10 mb-8">
                        <div>
                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="bg-[#033B4C] text-white py-3 px-4">+ Add Category</button>
                        </div>
                    </div> */}
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead className="bg-[#033B4C] rounded-lg text-white">
                            <tr className="h-12 font-normal text-center text-[14px]">
                                <th>#</th>
                                <th>email</th>
                                <th>Price</th>
                                <th>transactionId</th>
                                <th>Status</th>
                                <th>Accept Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <p>{item?.email}</p>
                                        </td>
                                        <td>
                                            <p>{item?.price / 100}</p>
                                        </td>
                                        <td>
                                            <p>{item?.transactionId}</p>
                                        </td>
                                        <td>


                                            <p className={`text-red-900 font-semibold text-center rounded-full py-1 cursor-pointer w-24 m-auto ${item?.status === 'pending' && 'text-green-900'}`}
                                            >{item?.status}</p>
                                        </td>
                                        <td>
                                            <button disabled={item?.status === 'paid'} className={`bg-green-300  text-green-800 text-center rounded-full py-1 cursor-pointer  w-32 m-auto ${item?.status === 'paid' ? 'bg-gray-400 text-gray-500': ''}`} onClick={() => handleAcceptPayment(item?._id)}  >accept payment</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

                {/* <dialog id="my_modal_3" className="modal">
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
                </dialog> */}

                {/* update data */}
                {/* <dialog id="my_modal_update" className="modal">
                    <div className="modal-box w-11/12">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleUpdate} className=' bg-white bg-opacity-30  w-[100%] lg:p-10 p-5 space-y-5'>
                            <p className='text-4xl text-center font-semibold'>Update Category {categoryUpdate?.category}</p>
                            <div className='form-control'>
                                <p className=''>Category Name : *</p>

                                <input type="text" name="category" defaultValue={categoryUpdate?.category} placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" required />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="" className="text-black   pb-2" >Image *</label>
                                <input

                                    className="py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg " name="image" required defaultValue={categoryUpdate?.image} />
                            </div>
                            <div className='form-control'>
                                <p className=''>Description *</p>

                                <textarea required name="description" defaultValue={categoryUpdate?.description} type="text" placeholder="Type here" className=" py-3 px-4 input-bordered w-full border border-[#033B4C] rounded-lg" />
                            </div>

                            <div>
                                <button className='bg-[#033B4C] w-full text-center py-3 text-white mt-3'> + Update Category</button>

                            </div>
                        </form>
                    </div>
                </dialog> */}


            </div>

        </div>
    );
};

export default Payment;