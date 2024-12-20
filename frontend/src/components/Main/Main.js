import './Main.css';
import { useState } from 'react';
import { useEffect } from 'react';
import OurProducts from './sub/OurProducts/OurProducts';
import BasketWidget from './sub/BasketWidget/BasketWidget';
import Basket from './sub/Basket/Basket';
import Order from './sub/Order/Order';

export default function Main({ selectedProduct, setSelectedProduct, tabChoice, displayBasket, setDisplayBasket, basket, setBasket, setTabChoice }) {


    return <main id='main'>
        {tabChoice == "browse" ? <OurProducts selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} basket={basket} setBasket={setBasket} setTabChoice={setTabChoice} /> :
            tabChoice == "basket" ? <Basket basket={basket} setBasket={setBasket} setTabChoice={setTabChoice} /> : tabChoice=="order" ? <Order basket={basket} setBasket={setBasket}/> : <></>

        }
        <BasketWidget setDisplayBasket={setDisplayBasket} displayBasket={displayBasket} basket={basket} setBasket={setBasket} setTabChoice={setTabChoice} />

    </main>
}