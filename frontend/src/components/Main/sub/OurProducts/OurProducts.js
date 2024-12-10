import './OurProducts.css';
import ProductDetails from './sub/ProductDetails/ProductDetails';
import Product from './sub/product/Product'
import { useState } from 'react';
import { useEffect } from 'react';

export default function OurProducts({selectedProduct,setSelectedProduct,basket, setBasket,setTabChoice}) {
    const [products, setProducts] = useState();




    async function fetchData() {
        try {
            const response = await fetch(process.env.REACT_APP_API_PRODUCTS, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setProducts(json);
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }

    }

    useEffect(() => {
        fetchData();
    }, [])
    return <>
        {selectedProduct !== null ? <ProductDetails productID={selectedProduct} basket={basket} setBasket={setBasket} setTabChoice={setTabChoice}/> :
            <>
                <span id='our-products'>Nasze produkty</span>
                <div id='products-container'>
                    {
                        products !== undefined ? products.length > 0 ? products.map(p => {
                            return <Product key={p.id} product={p} setSelectedProduct={setSelectedProduct} />
                        }) : <></> : <></>
                    }
                </div>
            </>
        }
    </>
}