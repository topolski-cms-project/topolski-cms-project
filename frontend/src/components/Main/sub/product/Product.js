import { useEffect, useState } from 'react';
import './Product.css';

export default function Product({ product, setSelectedProduct }) {

    return <div className='product'>
        <div className='product-top'>
            <div className='product-image' style={{
                backgroundImage: `url(http://localhost:8080/api/images/${product.imageUrls[0]})`
            }}></div>
        </div>
        <div className='product-bottom'>
            <div className='product-name' onClick={() => setSelectedProduct(product.id)}>
                {product.name}
            </div>
            <div className='product-price'>
                {product.price} zł
            </div>
        </div>
    </div>
}