import { useEffect, useState } from 'react';
import './Header.css';

export default function Header({ setSelectedProduct, tabChoice, setTabChoice, setDisplayBasket, basket }) {
    const [totalItems, setTotalItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        setTotalItems(basket.length);
        let price = 0;
        basket.forEach(i => {
            price+=(i.quantity*i.product.price);
        });
        setTotalPrice(price.toFixed(2));
    }, [basket])

    return <>
        <header id='header' >
            <div id='header-middle'>
                <div id='logo' onClick={() => { setSelectedProduct(null); setTabChoice('browse'); }}>
                    wooden store.
                </div>
                <div id='browse-products-bttn' className='header-bttn' onClick={() => setTabChoice("browse")} >
                    <span className={tabChoice == "browse" ? 'bttn-underlined' : ''}>Przeglądaj produkty</span>
                </div>
                <div id='about-us-bttn' className='header-bttn' onClick={() => setTabChoice("about")}>
                    <span className={tabChoice == "about" ? 'bttn-underlined' : ''}>O Nas</span>
                </div>
                <div id='contact-bttn' className='header-bttn ' onClick={() => setTabChoice("contact")}>
                    <span className={tabChoice == "contact" ? 'bttn-underlined' : ''}>Kontakt</span>
                </div>
                <div id='login-bttn' className='header-bttn' onClick={() => setTabChoice("login")}>
                    <span className={tabChoice == "login" ? 'bttn-underlined' : ''}>Logowanie / Rejestracja</span>
                </div>
                <div id='basket' >
                    <div id='basket-image' onClick={() => { setDisplayBasket(true) }}>
                        <div id='basket-items-amount'>{totalItems}</div>
                    </div>
                    <div id='basket-price-total' onClick={() => { setDisplayBasket(true) }}>

                        {totalPrice} zł
                    </div>
                </div>
            </div>
        </header>
    </>
}