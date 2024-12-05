import './Product.css';

export default function Product({product,setSelectedProduct}) {
    return <div className='product'>
        <div className='product-top'>
            <div className='product-image' style={{'--bg-url': `url(${product.imageUrl})` }}></div>
        </div>
        <div className='product-bottom'>
            <div className='product-name' onClick={()=>setSelectedProduct(product.id)}>
                {product.name}
            </div>
            <div className='product-price'>
                {product.price} zł
            </div>
        </div>
    </div>
}