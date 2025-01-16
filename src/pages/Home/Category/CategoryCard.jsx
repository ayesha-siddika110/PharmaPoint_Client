import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({item}) => {

    const {image, description, category} = item || {}

    const [product, setProduct] = useState([])
    // useEffect(()=>{
    //     axios.get('http://localhost:3000/products')
    // .then(res=>{
    //     setProduct(res.data)
    // })
    // }, [])
    
    // const productCategory = product?.filter(item=> item?.category === category)
    // console.log(productCategory);
    


    return (
        <Link to={`/category/${category}`} className='border p-4'>
            <img src={image} className='h-[200px] object-cover' alt="" />
            <p>Category : <span>{category}</span></p>
            <p>Total Item : 10</p>


            
        </Link>
    );
};

export default CategoryCard;