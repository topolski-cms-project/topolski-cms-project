import { useEffect, useState } from 'react';
import './Basket.css';
import BasketItem from './sub/BasketItem/BasketItem';

export default function Basket({ basket, setBasket, setTabChoice }) {
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalBasketPrice, setTotalBasketPrice] = useState();
    function calculateTotalBasketPrice() {
        let price = 0;
        basket.forEach(i => {
            price += i.product.price * i.quantity;

        });
        return price.toFixed(2);
    }

    useEffect(() => {
        setTotalBasketPrice(calculateTotalBasketPrice())
    }, [basket])

    return <>
        <div id='basket-container'>
            <div id='basket-products-container'>
                <div id='basket-labels'>
                    <span id='basket-label-1'>PRODUKT</span>
                    <span id='basket-label-2'>CENA</span>
                    <span id='basket-label-3'>ILOŚĆ</span>
                    <span id='basket-label-4'>KWOTA</span>
                </div>
                <div id='basket-products'>
                    {basket !== undefined && basket.length > 0 ? basket.map(b => <BasketItem item={b.product} quantity={b.quantity} basket={basket} setBasket={setBasket} />) : <></>}
                </div>
            </div>
            <div id='basket-sumup-container'>
                <span id='basket-sumup-label'>PODSUMOWANIE KOSZYKA</span>
                <div id='sumup-price'>
                    <span>Kwota</span>
                    <span>{calculateTotalBasketPrice(basket)} zł</span>
                </div>
                <div id='sumup-delivery'>
                    <span>Wysyłka</span>
                    <div></div>
                </div>
                <div id='sumup-total'>
                    <span>Łącznie</span>
                    <span style={{ fontWeight: '600', color: 'red' }}>{parseFloat(totalBasketPrice) + parseFloat(deliveryPrice)} zł</span>
                </div>
                <div id='payment-bttn' className={basket.length == 0 ? "empty-order" : ""} onClick={() => { if (basket.length > 0) setTabChoice("order") }}>
                    Przejdź do płatności
                </div>
            </div>
        </div>
    </>
}