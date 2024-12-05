import './Main.css';
import Product from './sub/product/Product';
import { useEffect } from 'react';

export default function Main() {
    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8080/api/products",{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <main id='main'>
        <span id='our-products'>Nasze produkty</span>
        <div id='products-container'>
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </div>
    </main>
}