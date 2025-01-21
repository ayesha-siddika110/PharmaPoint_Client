
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSign from '../../../../Share/LoadingSign/LoadingSign';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useRole from '../../../../Hooks/useRole';

const BannerAdvertise = () => {
    const axiosSecure = useAxiosSecure()
    const [role] = useRole()
    const { data: advertise = [], refetch, isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertise`)
            return res.data
        }
    })


    if (isLoading) {
        <LoadingSign></LoadingSign>
    }

    
        
        const handleUpdate = (id) => {
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
                        if(advertise.find(item=>item.status==='active')){
                            axiosSecure.patch(`/advertise/${id}`, { status: 'pending' })
                           .then(res => {
                               
                           
                               Swal.fire({
                                   title: "removed from slide",
                                   text: "This advertise has been removed from slide",
                                   icon: "success"
                               });
                               refetch()
                           })
                            return}
                            else{
                                axiosSecure.patch(`/advertise/${id}`, { status: 'active' })
                           .then(res => {
                               
                           
                               Swal.fire({
                                   title: "Advertise active",
                                   text: "This advertise has been activated",
                                   icon: "success"
                               });
                               refetch()
                           })

                            }
                           
                           
                       }
                   });
    
    
        }
    
        // delete category
        const handleDelete = (id) => {
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
        <div className='w-[80%] m-auto'>

            <h1>Banner Advertise</h1>
            <table className="table table-zebra ">
                {/* head */}
                <thead className="bg-[#033B4C] rounded-lg text-white">
                    <tr className="h-12 font-normal text-center text-[14px]">
                        <th></th>
                        <th>Photo</th>
                        <th>Title</th>
                        <th>details</th>
                        <th>Status</th>
                        <th className='w-[20%]'>Update</th>
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
                                    <p className={`${item?.status === 'active'? 'text-green-600' : 'text-red-600' } font-semibold`}>{item?.status}</p>
                                </td>
                                <td>
                                            <p className={` text-center rounded-full py-1 cursor-pointer m-auto ${item?.status === 'active'? 'bg-red-300 text-red-600' : 'bg-green-300  text-green-800' }`} onClick={() => handleUpdate(item?._id)} 
                                    >{item?.status === 'active' ? 'remove from Silde' : 'Add To Slide'}</p>
                                </td>
                                <td>
                                    <p className="bg-red-300  text-red-800 text-center rounded-full py-1 cursor-pointer  w-24 m-auto" onClick={() => handleDelete(item?._id)} >delete</p>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>


        </div>
    );
};

export default BannerAdvertise;