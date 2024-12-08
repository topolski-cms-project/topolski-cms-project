import './BasketWidgetProduct.css';

export default function BasketWidgetProduct({product,quantity,deleteProduct}) {
    console.log(product)
    return <div className='basket-widget-product-container'>
        <div className='basket-widget-product-image' style={{backgroundImage:`url(http://localhost:8080/api/images/${product.imageUrls[0]})`}}>

        </div>
        <div className='basket-widget-product-details'>
            <span>{product.name}</span>
            <span>{product.height}cm W x {product.width}cm S</span>
            <span style={{color:'rgba(0, 0, 0, 0.3)'}}>{quantity} x <span style={{color:"red", fontWeight:'500'}}>{product.price} zł</span></span>
        </div>
        <div className='basket-widget-delete-bttn' onClick={()=>{deleteProduct(product)}}>

        </div>
    </div>
}