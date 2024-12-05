import './ProductDetails.css';

export default function ProductDetails({ product }) {
    console.log(product)
    return <div id='product-details-container'>
        <div id='product-details-top'>
            <div id='product-details-image-container'>
                <div id='product-details-images-left'>
                    <div id='product-details-square-1' className='product-details-squares'>

                    </div>
                    <div id='product-details-square-2' className='product-details-squares'>

                    </div>
                    <div id='product-details-square-3' className='product-details-squares'>

                    </div>
                    <div id='product-details-images-nav'>
                        <div id='product-details-images-nav-up' className='product-details-nav-bttn'>

                        </div>
                        <div id='product-details-images-nav-down' className='product-details-nav-bttn'>

                        </div>
                    </div>

                </div>
                <div id='product-details-images-right'>
                    <div id='product-details-image-main'>

                    </div>
                </div>

            </div>
            <div id='product-details'>
                <span id='product-name'>
                    {product.name}
                </span>
                <span id='product-price'>
                    {product.price} zł
                </span>
                <span id='product-description'>
                    {product.description}
                </span>
                
            </div>
        </div>
        <div id='product-details-bottom'></div>
    </div>
}