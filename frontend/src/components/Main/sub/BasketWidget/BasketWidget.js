import './BasketWidget.css';
import BasketWidgetProduct from './sub/BasketWidgetProduct/BasketWidgetProduct';

export default function BasketWidget({ setDisplayBasket, displayBasket, basket, setBasket, setTabChoice }) {
    function deleteProduct(product) {
        setBasket(basket.filter(p => p.product.id != product.id));
    }

    function calculateTotalBasketPrice() {
        let price = 0;
        basket.forEach(i => {
            price += i.product.price * i.quantity;

        });
        return price.toFixed(2);
    }

    return <div id='basket-widget-container' className={displayBasket ? "basket-widget-container-active" : ""} >
        <div id='basket-widget-shadow' onClick={() => setDisplayBasket(false)} className={displayBasket ? "basket-widget-shadow-active" : ""}>

        </div>
        <div id='basket-widget' className={displayBasket ? "basket-widget-active" : ""}>
            <div id='basket-widget-nav' >
                <span>Koszyk</span>
                <div id='close-basket-widget-bttn' onClick={() => setDisplayBasket(false)}>
                    <div id='close-icon'>

                    </div>
                    <span>
                        Zamknij
                    </span>

                </div>
            </div>
            <div id='basket-widget-products-container'>
                {basket.map(p => {
                    return <BasketWidgetProduct product={p.product} quantity={p.quantity} deleteProduct={deleteProduct} />
                })}
            </div>
            <div id='basket-widget-sumup'>
                <div id='basket-widget-sumup-price'>
                    <span style={{ fontWeight: '500' }}>Kwota:</span>
                    <span style={{ fontWeight: '600', color: 'rgba(255, 0, 0, 0.7);' }}>{calculateTotalBasketPrice()} zł</span>
                </div>
                <div id='see-basket-bttn' className='basket-widget-bttn' onClick={() => setTabChoice("basket")} >
                    Zobacz koszyk
                </div>
                <div id='order-bttn' className={basket.length == 0 ? "basket-widget-bttn empty-order" : "basket-widget-bttn"} onClick={() => { if (basket.length > 0) setTabChoice("order") }}>
                    Złóż zamówienie
                </div>
            </div>
        </div>
    </div>
}