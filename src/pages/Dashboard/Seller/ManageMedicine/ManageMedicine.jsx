import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import AddProduct from "../addProduct";
import Swal from "sweetalert2";


const ManageMedicine = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${user?.email}`)
            return res.data
        }
    })
    console.log(products);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Deleted Successfully',
                            showConfirmButton: false,
                            timer: 1500

                        })



                    })
            }
        })
    }

    return (
        <div>
            <div className="w-[80%] m-auto">
                <div className="overflow-x-auto">
                    <h1 className="text-2xl font-bold text-center mt-20 mb-14">Manage Medicine</h1>
                    <div className="flex justify-end items-center mt-10 mb-8">
                        <div>
                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="bg-[#033B4C] text-white py-3 px-4">+ Add Medicine</button>
                        </div>
                    </div>
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead className="bg-[#033B4C] rounded-lg text-white">
                            <tr className="h-12 font-normal text-center text-[14px]">
                                <th>#</th>
                                <th>image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((item, index) => (
                                    <tr key={index} className="text-center h-20">
                                        <td>{index + 1}</td>

                                        <td>

                                            <img src={item?.productPhoto} alt="" className="w-18 m-auto h-14 object-cover" />

                                        </td>
                                        <td>
                                            <p>{item?.productName}</p>
                                        </td>
                                        <td>
                                            <p>{item?.category}</p>
                                        </td>
                                        <td>
                                            <p>{item?.price}</p>
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

                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box w-9/12 max-w-5xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <AddProduct refetch={refetch}></AddProduct>
                    </div>
                </dialog>


            </div>

        </div>
    );
};

export default ManageMedicine;