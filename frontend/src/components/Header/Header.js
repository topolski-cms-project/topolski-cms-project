import { useState } from 'react';
import './Header.css';

export default function Header({ setSelectedProduct, tabChoice,setTabChoice,setDisplayBasket }) {
    

    return <>
        <header id='header' >
            <div id='header-middle'>
                <div id='logo' onClick={() => { setSelectedProduct(null); setTabChoice('our-products'); }}>
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
                    <div id='basket-image' onClick={()=>{setDisplayBasket(true)}}>

                    </div>
                    <div id='basket-price-total' onClick={()=>{setDisplayBasket(true)}}>
                        123,23 zł
                    </div>
                </div>
            </div>
        </header>
    </>
}