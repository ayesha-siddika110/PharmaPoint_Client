import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';

const Products = () => {
    const axiosPublic = useAxiosPublic()
    const {data:products = [],refetch, isLoading:isProductLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/products')
            return res.data
        },
        

    })
    // console.log(products);
    
    return (
        <div>
            <div className='grid grid-cols-5 w-[90%] m-auto gap-4'>
                {
                    products?.map((item,idx)=><ProductCard key={idx} item={item}></ProductCard>)
                }
            </div>
            
        </div>
    );
};

export default Products;