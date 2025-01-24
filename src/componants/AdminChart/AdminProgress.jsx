import { PieChart } from '@mui/x-charts/PieChart';
const AdminProgress = () => {
    return (
        <div className='w-[80%] '>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Total Pending' },
                            { id: 1, value: 15, label: 'Total Paid' },
                            { id: 2, value: 20, label: 'Total Revenue' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
};

export default AdminProgress;