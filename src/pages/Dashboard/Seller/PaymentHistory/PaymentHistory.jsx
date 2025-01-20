import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            const matchingItem = res.data.filter(item => item.sellerEmail.includes(user?.email));
            return matchingItem
        }
    })
    console.log(payments);
    

    // console.log(payments);
    // const
    // axiosSecure.get(`/payments`)
    // .then(res=>{

    //     const matchingItem = res.data.filter(item => item.sellerEmail.includes(user?.email));
    //     console.log(matchingItem);
    // })

    
    // if (isLoading) {
    //     return <LoadingSign></LoadingSign>
    // }
    

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
                                <th>Product name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>transactionId</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <p>product er name</p>
                                        </td>
                                        <td>
                                            <p>Quantity</p>
                                        </td>
                                        <td>
                                            <p>{item?.price / 100}</p>
                                        </td>
                                        <td>
                                            <p>{item?.transactionId}</p>
                                        </td>
                                        <td>


                                            <p className={`text-green-900 bg-green-300 font-semibold text-center rounded-full py-1 cursor-pointer w-24 m-auto ${item?.status === 'pending' && 'text-red-900 bg-red-300'}`}
                                            >{item?.status}</p>
                                        </td>
                                        <td>
                                            
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

export default PaymentHistory;