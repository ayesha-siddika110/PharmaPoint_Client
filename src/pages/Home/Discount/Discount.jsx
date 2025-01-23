
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import DiscountCard from './DiscountCard';
import DashboardHeading from '../../../Share/dashboardHeading/DashboardHeading';

const Discount = () => {
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
                <SwiperSlide><DiscountCard></DiscountCard></SwiperSlide>
                <SwiperSlide><DiscountCard></DiscountCard></SwiperSlide>
                <SwiperSlide><DiscountCard></DiscountCard></SwiperSlide>
                <SwiperSlide><DiscountCard></DiscountCard></SwiperSlide>
                <SwiperSlide><DiscountCard></DiscountCard></SwiperSlide>
                <SwiperSlide><DiscountCard></DiscountCard></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Discount;