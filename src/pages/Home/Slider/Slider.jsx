import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import LoadingSign from '../../../Share/LoadingSign/LoadingSign';



const Slider = () => {
    const axiosPublic = useAxiosPublic()
    const {data : advertise = [], isLoading} = useQuery({
        queryKey: ['advertise'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/advertise')
            return res.data
        }
    })
    console.log(advertise);
    if(isLoading){
        return <LoadingSign></LoadingSign>
    }
    
    return (
        <div className=''>
            

            <Swiper
        pagination={{
          dynamicBullets: true,
          
        }}
        autoplay={{
            delay: 4000,
            disableOnInteraction: false,
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper lg:h-[70vh] "
      >
        {
            advertise?.map((item, index)=><SwiperSlide key={index}><img src={item?.image} className='w-full h-full object-cover ' alt="" /></SwiperSlide>)
        }
        
      
        
        
      </Swiper>
        </div>
    );
};

export default Slider;