import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './categoryCard.css'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
const CategoryCard = ({ item }) => {
    const axiosPublic = useAxiosPublic()
    const { image, description, category } = item || {}
    const slicedes = description.slice(0,90)
    const {data:products} = useQuery({
        queryKey: ['products'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/products`)
            return res.data
        }
    })
    // console.log('products',products);
    

    const filtercategory = products?.products?.filter(product => product.category === category);

   


    return (
        // <Link to={`/category/${category}`} classNameNameName='border p-4'>
        //     <img src={image} classNameName='h-[200px] object-cover' alt="" />
        //     <p>Category : <span>{category}</span></p>
        //     <p>Total Item : 10</p>



        // </Link>
        <>
            <Link to={`/category/${category}`} className="card4" >
            
                <img src={image} className='w-full h-[200px] object-cover' alt="" />
                <div className='text-center p-4'>
                    <h3>{category}</h3>
                    <p className="small">{slicedes}...</p>
                    <p className='text-black'>Total Product : {filtercategory?.length}</p>
                    <div className="dimmer"></div>


                </div>
                <div className="go-corner" href="#">
                    <div className="go-arrow">
                    </div>
                </div>

            </Link >

        </>
    );
};

export default CategoryCard;