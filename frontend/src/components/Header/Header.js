import { useState } from 'react';
import './Header.css';

export default function Header({setSelectedProduct}) {
    const [currentTab, setCurrentTab] = useState("browse");

    return <>
        <header id='header' >
            <div id='header-middle'>
                <div id='logo' onClick={()=>setSelectedProduct(null)}>
                    wooden store.
                </div>
                <div id='browse-products-bttn' className='header-bttn' onClick={() => setCurrentTab("browse")} >
                    <span className={currentTab == "browse" ? 'bttn-underlined' : ''}>Przeglądaj produkty</span>
                </div>
                <div id='about-us-bttn' className='header-bttn' onClick={() => setCurrentTab("about")}>
                    <span className={currentTab == "about" ? 'bttn-underlined' : ''}>O Nas</span>
                </div>
                <div id='contact-bttn' className='header-bttn ' onClick={() => setCurrentTab("contact")}>
                    <span className={currentTab == "contact" ? 'bttn-underlined' : ''}>Kontakt</span>
                </div>
                <div id='login-bttn' className='header-bttn' onClick={() => setCurrentTab("login")}>
                    <span className={currentTab == "login" ? 'bttn-underlined' : ''}>Logowanie / Rejestracja</span>
                </div>
                <div id='basket'>
                    <div id='basket-image'>

                    </div>
                    <div id='basket-price-total'>
                        123,23 zł
                    </div>
                </div>
            </div>
        </header>
    </>
}