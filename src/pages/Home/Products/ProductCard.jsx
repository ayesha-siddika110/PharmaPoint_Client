import React from 'react';

const ProductCard = ({item}) => {
    const {productPhoto, category, price, quantity, productName} = item || {}
    return (
        <div className='group shadow-md p-4'>
            <img src={productPhoto} className='group-hover:scale-110 h-32 rounded-lg w-full object-cover' alt="" />
            <p>{productName}</p>
            <p>{category}</p>
            <p>{price}</p>
            <p>{quantity}</p>
            

            
        </div>
    );
};

export default ProductCard;