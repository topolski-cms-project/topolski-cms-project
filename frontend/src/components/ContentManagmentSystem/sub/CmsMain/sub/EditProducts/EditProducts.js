import './EditProducts.css'
import ProductBar from "./sub/ProductBar/ProductBar";
import {useEffect, useState} from "react";

export default function EditProducts() {
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        const response = await fetch(process.env.REACT_APP_API_ADMIN_GET_PRODUCTS,
            {
                method: 'GET',
                headers: {
                    "contet-type": "application/json"
                }
            });
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    },[])

    return <div id="edit-products-container">
        <div id='edit-products-container-left'>
            {products!==undefined && products.length>0  ? products.map((p,index) => {
                return <ProductBar key={index} product={p} />
            }) : <></>}
        </div>
        <div id='edit-products-container-right'>

        </div>
    </div>
}