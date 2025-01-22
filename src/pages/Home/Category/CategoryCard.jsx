import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './categoryCard.css'
const CategoryCard = ({ item }) => {

    const { image, description, category } = item || {}
    const slicedes = description.slice(0,90)


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
                    <div className="dimmer"></div>


                </div>
                <div className="go-corner" href="#">
                    <div className="go-arrow">
                        *
                    </div>
                </div>

            </Link >

        </>
    );
};

export default CategoryCard;