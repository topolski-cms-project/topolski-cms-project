import './BasketItem.css';
import { useEffect, useState } from 'react';

export default function BasketItem({ item, quantity, basket, setBasket }) {
    const [newQuantity, setNewQuantity] = useState(quantity);

    function deleteProduct(product){
        setBasket(basket.filter(p=>p.product.id!=product.id));
    }

    function manageQuantity(operation, value) {
        if (operation == 'substraction' && newQuantity - 1 > 0) {
            setNewQuantity(newQuantity - 1)
        } else if (operation == 'addition' && newQuantity + 1 <= 99) {
            setNewQuantity(newQuantity + 1)
        } else if (operation == 'change' && value >= 1 && value <= 99) {
            setNewQuantity(value);
        }
    }

    useEffect(() => {
        if (basket.length > 0){
            const updatedBasket = basket.map(b =>
                b.product.id === item.id ? { ...b, quantity: newQuantity } : b
            );
            setBasket(updatedBasket);
        }
    }, [newQuantity])

    return <div className='basket-item'>
        <div className='basket-item-remove'>
            <div className='basket-item-remove-bttn' onClick={()=>{deleteProduct(item)}}>

            </div>
        </div>
        <div className='basket-item-image-container' >
            <div className='basket-item-image' style={{ backgroundImage: `url(${process.env.REACT_APP_API_IMAGES}${item.imageUrls[0]})` }}>

            </div>
        </div>
        <div className='basket-item-details'>
            <span className='basket-item-detail-name'>{item.name}</span>
            <span className='basket-item-detail-dimensions'><span style={{ fontWeight: '600' }}>Rozmiar: </span>{item.height}cm Wys. x {item.width}cm Szer.</span>
        </div>
        <div className='basket-item-price'>
            {item.price} zł
        </div>
        <div className='basket-item-amount'>
            <div className='basket-item-quantity-selector'>
                <div id='substract-bttn' className='quantity-bttn' onClick={() => manageQuantity("substraction", null)} >
                    -
                </div>
                <input type='number' id='number-input' value={newQuantity} onChange={(e) => manageQuantity("change", e.target.value)}></input>

                <div id='addition-bttn' className='quantity-bttn' onClick={() => manageQuantity("addition", null)}>
                    +
                </div>
            </div>
        </div>
        <div className='basket-item-total'>
            {(item.price * newQuantity).toFixed(2)} zł
        </div>
    </div>
}