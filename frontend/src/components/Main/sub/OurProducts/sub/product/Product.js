import { useEffect, useState } from 'react';
import './Product.css';
import { Rating } from '@mui/material';

export default function Product({ product, setSelectedProduct }) {

    return <div className='product'>
        <div className='product-top'>
            <div className='product-image' style={{
                backgroundImage: `url(${process.env.REACT_APP_API_IMAGES}${product.imageUrls[0]})`
            }}
            >

                <div className='product-image-animated'
                    style={{
                        backgroundImage: `url(${process.env.REACT_APP_API_IMAGES}${product.imageUrls[1]})`
                    }} onClick={() => setSelectedProduct(product.id)}>


                </div>
            </div>

        </div>
        <div className='product-bottom'>
            <div className='product-name' onClick={() => setSelectedProduct(product.id)}>
                {product.name}
            </div>
            <div className='product-price'>
                {product.price} zł
            </div>
        </div>
        <div className='rating-container'>
            <Rating
                defaultValue={product.ratingScore}
                precision={0.5}
                readOnly
            />
        </div>
        <div className='availability'>
            {product.stockQuantity>0 ? `Ilość dostępnych sztuk: ${product.stockQuantity}` : `Dostępne w: ${product.stockAvailability} dni`}
        </div>
    </div>
}