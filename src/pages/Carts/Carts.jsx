
import { ImSpinner3 } from 'react-icons/im';
import DashboardHeading from '../../Share/dashboardHeading/DashboardHeading';
import Swal from 'sweetalert2';
import axios from 'axios';
import useCart from '../../Hooks/useCart';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingSign from '../../Share/LoadingSign/LoadingSign';

const Carts = () => {
    const [cart, refetch, isLoading] = useCart()

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            axios.delete(`https://medicine-selling-e-commerce-server.vercel.app/cart/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }

                        //   const remain = ramaing.filter(item=> item._id!== _id)
                        //   setRemaining(remain)
                    }

                })
        });

    }

    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    // const { data: cart = [] } = useQuery({
    //     queryKey: ['cart'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/cart/${user?.email}`)
    //         return res.data
    //     }
    // })
    // console.log(cart);
    const filtercart = cart?.filter(item=> item?.buyerEmail === user?.email)
    

    //   sum the price
    const [totalPrices, setTotalPrices] = useState()

    const totalPrice = filtercart.reduce((total, item) => {
        return total + parseFloat(item.price);
    }, 0);
    

    // console.log(totalPrice);


    return (
        <div>
             <Helmet>
                <title>My Cart - PharmaPoint</title>
            </Helmet>
            {
                isLoading && <LoadingSign></LoadingSign>
            }
            {
                isLoading || <>
                    <div className='w-[90%] m-auto'>
                        <div>
                            <DashboardHeading title={"My Cart"}></DashboardHeading>
                        </div>
                        <div className='flex justify-end gap-10 pb-10'>
                            <p className='text-2xl text-black'>Total Price : {totalPrice}</p>

                            <p><Link to="/checkout" ><button className=" text-center py-2 px-3  text-white bg-[#033B4C] cursor-pointer" disabled={!cart.length}>Checkout</button></Link></p>

                        </div>

                        <div>
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>image</th>
                                        <th>Info</th>
                                        {/* <th>Company</th> *TODO: include the database company field */}
                                        <th>number of product</th>
                                        <th>Price</th>
                                        <th>Delete cart</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filtercart?.map((item, index) => <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td><img src={item?.productPhoto} className="h-16 w-24 object-cover" alt="" /></td>
                                            <td>
                                                <p>{item?.productName}</p>
                                                <p>Dynamic company</p>
                                                {/* <p>Quantity : {item?.quantity}</p> */}
                                            </td>

                                            <td>

                                               <p>1</p>

                                            </td>
                                            <td>{item?.price}</td>
                                            <td><p onClick={() => handleDelete(item?._id)} className="bg-[#f3aeae] w-20 text-center py-1 rounded-full text-[#861414] cursor-pointer">delete</p></td>


                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </>
            }

        </div>
    );
};

export default Carts;