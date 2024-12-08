import { useEffect, useState } from 'react';
import './ProductDetails.css';
import ImageGallery from './sub/ImageGallery/ImageGallery';
import Description from './sub/Description/Description';
import Reviews from './sub/Reviews/Reviews';





export default function ProductDetails({ productID,basket,setBasket }) {
    const [quantity,setQuantity]=useState(1);
    const [product, setProduct] = useState(undefined);
    // const [imagesArr, setImagesArr] = useState([]);
    const [navChoice,setNavChoice]=useState("description");
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
                        <span id='product-description-short'>
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
                            <div id='add-to-cart-bttn' onClick={()=>{setBasket([...basket,{product:product,quantity:quantity}])}}>
                                Dodaj do koszyka
                            </div>
                        </div>
                    </div>
                </div>
                <div id='product-details-bottom'>
                    <div id='product-details-bottom-nav'>
                        <div id='product-description' className={navChoice=="description" ? 'details-nav-bttn details-nav-bttn-active' : 'details-nav-bttn' } onClick={()=>{setNavChoice("description")}}>
                            OPIS
                        </div>
                        <div id='product-reviews' className={navChoice=="reviews" ? 'details-nav-bttn details-nav-bttn-active' : 'details-nav-bttn' } onClick={()=>{setNavChoice("reviews")}}>
                            OPINIE (0)
                        </div>
                        <div id='product-delivery' className={navChoice=="delivery" ? 'details-nav-bttn details-nav-bttn-active' : 'details-nav-bttn' } onClick={()=>{setNavChoice("delivery")}}>
                            PŁATNOŚĆ & DOSTAWA
                        </div>
                    </div>
                    {
                        navChoice =="description" ? <Description /> : navChoice=="reviews" ? <Reviews /> : <></>
                        
                    }
                </div>
            </> : <></>
        }
    </div >


}