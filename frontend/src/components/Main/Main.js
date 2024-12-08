import './Main.css';
import { useState } from 'react';
import { useEffect } from 'react';
import OurProducts from './sub/OurProducts/OurProducts';
import BasketWidget from './sub/BasketWidget/BasketWidget';

export default function Main({selectedProduct,setSelectedProduct,tabChoice,displayBasket,setDisplayBasket,basket,setBasket}) {
    

    return <main id='main'>
        <OurProducts selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} basket={basket} setBasket={setBasket} />

        <BasketWidget setDisplayBasket={setDisplayBasket} displayBasket={displayBasket} basket={basket} setBasket={setBasket}/>

    </main>
}