import './BasketWidget.css';
import BasketWidgetProduct from './sub/BasketWidgetProduct/BasketWidgetProduct';

export default function BasketWidget({ setDisplayBasket, displayBasket,basket,setBasket }) {
    function deleteProduct(product){
        setBasket(basket.filter(p=>p.product.id!=product.id));
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
                {basket.map(p=>{
                    return <BasketWidgetProduct product={p.product} quantity={p.quantity} deleteProduct={deleteProduct}/>
                })}
            </div>
        </div>
    </div>
}