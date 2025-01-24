import { useQuery } from "@tanstack/react-query";
import { FaSellsy, FaShoppingBag } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import AdminChart from "../../../../componants/AdminChart/AdminChart";
import AdminProgress from "../../../../componants/AdminChart/AdminProgress";
import SellerProgress from "../../../../componants/SellerChart/SellerProgress";
import useAuth from "../../../../Hooks/useAuth";


const SellerHome = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data} = useQuery({
        queryKey: ['sellerState'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`sellerState/${user?.email}`)
            return res.data
        }
    })
    console.log(data);
    const {sellerRevenue,totalPending,totalPaid} = data || {}

    return (
        <div className="w-[90%] m-auto mt-10">
            {/* The admin will see the total sales revenue of the website. Paid total, pending total */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">

                <div className="w-[250px] bg-blue-500 rounded-lg h-[120px] flex items-center justify-center gap-4">
                    {/* icon */}
                    <FaSellsy className="text-white text-[80px]" />
                    <div className="text-white space-y-4">
                        <p className="text-[30px] font-semibold text-white">{sellerRevenue}</p>
                        <p className="text-white text-lg uppercase">sales revenue</p>
                    </div>


                </div>
                <div className="w-[250px] bg-green-500 rounded-lg h-[120px] flex items-center justify-center gap-4">
                    {/* icon */}

                    <FaShoppingBag className="text-white text-[70px]" />
                    <div className="text-white space-y-4">
                        <p className="text-[50px] font-semibold text-white">{totalPaid}</p>
                        <p className="text-white text-lg uppercase">paid total</p>
                    </div>


                </div>
                <div className="w-[250px] bg-orange-500 rounded-lg h-[120px] flex items-center justify-center gap-4">
                    {/* icon */}
                    <MdOutlinePendingActions className="text-white text-[70px]" />
                    <div className="text-white space-y-4">
                        <p className="text-[50px] font-semibold text-white">{totalPending}</p>
                        <p className="text-white text-lg uppercase">pending total</p>
                    </div>


                </div>

            </div>

            <div className=" mt-[60px]">
                
                <div className="md:w-[40%] w-[80%] m-auto">
                    <SellerProgress></SellerProgress>
                </div>

            </div>



        </div>
    );
};

export default SellerHome;