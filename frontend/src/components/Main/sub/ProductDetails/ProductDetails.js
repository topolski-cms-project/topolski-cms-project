import { useEffect, useState } from 'react';
import './ProductDetails.css';
import ImageGallery from './sub/ImageGallery/ImageGallery';





export default function ProductDetails({ productID }) {
    const [quantity,setQuantity]=useState(1);
    const [product, setProduct] = useState(undefined);
    const [imagesArr, setImagesArr] = useState([]);
    async function fetchProduct() {
        const data = await fetch(`http://localhost:8080/api/products/${productID}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const response = await data.json();
        setProduct(response);

        

    }

    function manageQuantity(operation){
        if(operation=="substraction" && quantity>1){
            setQuantity(quantity-1)
        }else if(operation=="addition"){
            setQuantity(quantity+1)
        }
    }

    useEffect(() => {
        fetchProduct()

    }, [])
    return <div id='product-details-container'>
        {product !== undefined ?
            <>
                <div id='product-details-top'>
                    <ImageGallery product={product}/>
                    <div id='product-details'>
                        <span id='product-name'>
                            {product.name}
                        </span>
                        <span id='product-price'>
                            {product.price} zł
                        </span>
                        <span id='product-description'>
                            <b>{product.name} - </b>{product.description}
                        </span>
                        <span id='product-size'>
                            <b>Wymiary produktu:</b> <b>{product.width}cm</b> Szer. x <b>{product.height}cm</b> Wys.
                        </span>
                        <div id='product-managment'>
                            <div id='quantity-selector'>
                                <div id='substract-bttn' className='quantity-bttn' onClick={()=>manageQuantity("substraction")}>
                                    -
                                </div>
                                <input type='number' id='number-input' value={quantity}></input>

                                <div id='addition-bttn' className='quantity-bttn' onClick={()=>manageQuantity("addition")}>
                                    +
                                </div>
                            </div>
                            <div id='add-to-cart-bttn'>
                                Dodaj do koszyka
                            </div>
                        </div>
                    </div>
                </div>
                <div id='product-details-bottom'></div>
            </> : <></>
        }
    </div >


}