import { useQuery } from "@tanstack/react-query";
import { FaSellsy, FaShoppingBag } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import AdminChart from "../../../../componants/AdminChart/AdminChart";
import AdminProgress from "../../../../componants/AdminChart/AdminProgress";


const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const { data: adminData } = useQuery({
        queryKey: 'adminState',
        queryFn: async () => {
            const res = await axiosSecure.get('/adminState')
            return res.data

        }
    })
    console.log(adminData);
    const { totalRevenue, totalPaid , totalPending } = adminData || {}

    return (
        <div className="w-[90%] m-auto mt-10">
            {/* The admin will see the total sales revenue of the website. Paid total, pending total */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">

                <div className="md:w-[250px] w-[80%] m-auto bg-blue-500 rounded-lg h-[120px] flex items-center justify-center gap-4">
                    {/* icon */}
                    <FaSellsy className="text-white text-[80px]" />
                    <div className="text-white space-y-4">
                        <p className="text-[50px] font-semibold text-white">{totalRevenue}</p>
                        <p className="text-white text-lg uppercase">total sales</p>
                    </div>


                </div>
                <div className="md:w-[250px] w-[80%] m-auto bg-green-500 rounded-lg h-[120px] flex items-center justify-center gap-4">
                    {/* icon */}

                    <FaShoppingBag className="text-white text-[70px]" />
                    <div className="text-white space-y-4">
                        <p className="text-[50px] font-semibold text-white">{totalPaid}</p>
                        <p className="text-white text-lg uppercase">paid total</p>
                    </div>


                </div>
                <div className="md:w-[250px] w-[80%] m-auto bg-orange-500 rounded-lg h-[120px] flex items-center justify-center gap-4">
                    {/* icon */}
                    <MdOutlinePendingActions className="text-white text-[70px]" />
                    <div className="text-white space-y-4">
                        <p className="text-[50px] font-semibold text-white">{totalPending}</p>
                        <p className="text-white text-lg uppercase">pending total</p>
                    </div>


                </div>

            </div>

            <div className="md:flex mt-[60px]">
                <div className="md:w-[60%]">

                <AdminChart></AdminChart>
                </div>
                <div className="md:w-[40%] m-auto">
                    <AdminProgress></AdminProgress>
                </div>

            </div>



        </div>
    );
};

export default AdminHome;