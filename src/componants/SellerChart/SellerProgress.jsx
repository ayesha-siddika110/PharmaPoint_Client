import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
const SellerProgress = () => {
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
    
    return (
        <div>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: data?.totalPending , label: 'Total Pending' },
                            { id: 1, value: data?.totalPaid , label: 'Total Paid' },
                            { id: 2, value: data?.sellerRevenue , label: 'Total Revenue' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
};

export default SellerProgress;