import './Main.css';
import Product from './sub/product/Product';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductDetails from './sub/ProductDetails/ProductDetails';

export default function Main() {
    const [products, setProducts] = useState();
    const [selectedProduct, setSelectedProduct] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8080/api/products", {
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
        } catch (error) {
            console.error(error.message);
        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    return <main id='main'>
        {selectedProduct !== null ? <ProductDetails productID={selectedProduct}/> :
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
    </main>
}