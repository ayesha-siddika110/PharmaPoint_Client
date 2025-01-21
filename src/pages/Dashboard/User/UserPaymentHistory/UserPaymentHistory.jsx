import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const UserPaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // const [data,setdata] = useState([])
    // axios.get(`http://localhost:3000/payments/ayeshamail418109@gmail.com`)
    // .then(res=>{
    //     setdata(res.data);

    // })
    const { data = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="w-[90%] m-auto">
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold text-center my-5">Payment History</h1>
                <div className="flex justify-end items-center mt-10 mb-8">
                    
                </div>
                <table className="table table-zebra ">
                    {/* head */}
                    <thead className="bg-[#033B4C] rounded-lg text-white">
                        <tr className="h-12 font-normal text-center text-[14px]">
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>TansectionId</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <td>{index + 1}</td>

                                    <td>
                                        <p>product er name</p>
                                    </td>
                                    <td>
                                        <p>{item?.price}</p>
                                    </td>
                                    <td>


                                        <p>{item?.transactionId}</p>
                                    </td>
                                    <td>
                                        <p className={`${item?.status === 'paid' ? 'text-green-600 font-semibold': 'text-red-600 font-semibold'}`}>{item?.status}</p>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default UserPaymentHistory;