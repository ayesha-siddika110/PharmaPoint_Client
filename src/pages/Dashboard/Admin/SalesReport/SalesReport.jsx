import React from 'react';

const SalesReport = () => {
    return (
        <div>
             <div className="w-[80%] m-auto">
                <div className="overflow-x-auto">
                    <h1 className="text-2xl font-bold text-center mt-20 mb-14">Sales Report</h1>
                    <div className="flex justify-end items-center mt-10 mb-8">
                        <div>
                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="bg-[#033B4C] text-white py-3 px-4">+ Download Report</button>
                        </div>
                    </div>
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




            </div>
        </div>
    );
};

export default SalesReport;