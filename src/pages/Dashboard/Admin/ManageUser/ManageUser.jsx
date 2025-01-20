/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null); // Track the selected user

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handlestatus = async (id, newstatus) => {
        try {
            const res = await axiosSecure.patch(`/users/${id}`, { role: newstatus });
            refetch();
            toast.success("User role updated");
        } catch (error) {
            toast.error("Failed to update user role");
            // console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-5">Manage User</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-[80%] m-auto">
                    {/* Head */}
                    <thead className="bg-[#23505ecb] rounded-lg text-white">
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Info</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={user?.image} alt="" className="w-10 h-10" />
                                </td>
                                <td>
                                    <p>{user?.name}</p>
                                    <p>{user?.email}</p>
                                </td>
                                <td>
                                    <p
                                        onClick={() => setSelectedUser(user)} // Set selected user
                                        className={`w-[90px] text-center rounded-full py-1 cursor-pointer 
                                            ${user?.role === "user" && "bg-green-300 text-green-800"} 
                                            ${user?.role === "admin" && "bg-blue-300 text-blue-800"} 
                                            ${user?.role === "seller" && "bg-purple-300 text-purple-800"}`}
                                    >
                                        {user?.role}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedUser && (
                <dialog id="user_role_modal" className="modal" open>
                    <div className="modal-box border border-[#033b4c79] ">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => setSelectedUser(null)}
                            >
                                ✕
                            </button>
                        </form>
                        <p>Change the Role for {selectedUser?.name}?</p>
                        <select
                            onChange={(e) => {
                                handlestatus(selectedUser._id, e.target.value);
                                setSelectedUser(null); // Close the modal
                            }}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option disabled selected>Change the Role?</option>
                            <option value="admin">Admin</option>
                            <option value="seller">Seller</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageUser;
