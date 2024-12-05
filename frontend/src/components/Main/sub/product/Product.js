import './Product.css';

export default function Product() {
    return <div className='product'>
        <div className='product-top'>
            <div className='product-image'></div>
        </div>
        <div className='product-bottom'>
            <div className='product-name'>
                Some example product
            </div>
            <div className='product-price'>
                123,23 zł
            </div>
        </div>
    </div>
}