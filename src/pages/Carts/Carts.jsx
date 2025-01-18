
import { ImSpinner3 } from 'react-icons/im';
import DashboardHeading from '../../Share/dashboardHeading/DashboardHeading';
import Swal from 'sweetalert2';
import axios from 'axios';
import useCart from '../../Hooks/useCart';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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

            axios.delete(`http://localhost:3000/cart/${id}`)
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

    //   sum the price
    const [totalPrices, setTotalPrices] = useState()

    const totalPrice = cart.reduce((total, item) => {
        return total + parseFloat(item.price);
      }, 0);
      
      console.log(totalPrice);


    return (
        <div>
            {
                isLoading && <p className='animate-spin text-7xl w-[100%] h-[60vh] flex items-center justify-center '><ImSpinner3 /></p>
            }
            {
                isLoading || <>
                    <div className='w-[90%] m-auto'>
                        <div>
                            <DashboardHeading title={"My Cart"}></DashboardHeading><p>{cart?.length}</p>
                        </div>
                        <p className='text-4xl'>totalPrice : {totalPrice}</p>

                        <p><Link to="/checkout" ><button className="bg-[#68bac5] w-20 text-center py-1 rounded-full text-[#033B4C] cursor-pointer" disabled={!cart.length}>Checkout</button></Link></p>
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
                                        <th>Checkout</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart?.map((item, index) => <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td><img src={item?.productPhoto} className="h-16 w-24 object-cover" alt="" /></td>
                                            <td>
                                                <p>{item?.productName}</p>
                                                <p>Dynamic company</p>
                                                <p>Quantity : {item?.quantity}</p>
                                            </td>

                                            <td>

                                                <input type="number" defaultValue={1} name="" id="" />

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