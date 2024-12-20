import { useEffect, useState } from 'react';
import './Product.css';
import { Rating } from '@mui/material';
import LoadingWheel from "../../../../../LoadingWheel/LoadingWheel";

export default function Product({ product, setSelectedProduct }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = `${process.env.REACT_APP_API_IMAGES}${product.imageUrls[0]}`;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(false); // Handle error in case the image fails to load
    }, [product.imageUrls]); // Re-run the effect if product.imageUrls changes

    return <div className='product'>
        <div className='product-top'>
            {!isLoaded && <LoadingWheel showDarkBackground={false}/>}
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