// Desc: Manage User Page for Admin

import axios from "axios";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";



const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handlestatus = async (id, newstatus) => {
        console.log(id);
        const res = await axiosSecure.patch(`/users/${id}`, { role: newstatus })
        console.log(res.data);
        refetch()
        toast.success('User role updated')
        // closeModal()
    }
    // axiosSecure.patch('', { role: 'admin' })

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-5">Manage User</h1>
            <div className="overflow-x-auto">

                <table className="table table-zebra w-[80%] m-auto">
                    {/* head */}
                    <thead className="bg-[#23505ecb] rounded-lg text-white">
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Info</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>
                                        <img src={user?.image} alt="" className="w-10 h-10" />
                                    </td>
                                    <td>
                                        <p>{user?.name}</p>
                                        <p>{user?.email}</p>
                                    </td>
                                    <td>
                                        <p onClick={() => document.getElementById('my_modal_3').showModal()} className={`w-[90px]  text-center rounded-full py-1 cursor-pointer 
                                            ${user?.role === 'user' && 'bg-green-300  text-green-800'} 
                                            ${user?.role === 'admin' && 'bg-blue-300  text-blue-800'} 
                                            ${user?.role === 'seller' && 'bg-purple-300  text-purple-800'}`}>{user?.role}</p>

                                        {/* modal */}
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">

                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <select onClick={(e)=>handlestatus(user?._id, e.target.value)} className="select select-bordered w-full max-w-xs">
                                                    <option disabled selected>Change the Role ?</option>
                                                    <option disabled={user?.role === 'admin'}>admin</option>
                                                    <option>seller</option>
                                                    <option>user</option>
                                                </select>
                                            </div>
                                        </dialog>
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

export default ManageUser;