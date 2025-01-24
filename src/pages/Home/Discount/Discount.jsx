
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import DiscountCard from './DiscountCard';
import DashboardHeading from '../../../Share/dashboardHeading/DashboardHeading';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Discount = () => {
    const axiosPublic = useAxiosPublic()

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products`)
            return res.data
        }
    })
    console.log('products', products);


    const filterproduct = products?.products?.filter(product => parseFloat(product.discount) > 0);
    console.log(filterproduct);
    

    return (
        <div className='w-[90%] m-auto'>
            <DashboardHeading title={"Discount Offer"}></DashboardHeading>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    filterproduct?.map((item, index)=><SwiperSlide key={index}><DiscountCard item={item}></DiscountCard></SwiperSlide>)
                }
                
            </Swiper>
        </div>
    );
};

export default Discount;