import { useState } from 'react';
import './OrderItem.css';

export default function OrderItem({ product, quantity, basket, setBasket }) {
    function calculateTotalBasketPrice() {
        let price = 0;
        basket.forEach(i => {
            price += i.product.price * i.quantity;

        });
        return price.toFixed(2);
    }

    function deleteProduct(product) {
        setBasket(basket.filter(p => p.product.id != product.id));
    }
    console.log("KURWA", product)
    const [newQuantity, setNewQuantity] = useState(quantity);
    function manageQuantity(operation) {
        if (operation == "substraction" && newQuantity > 1) {
            setNewQuantity(newQuantity - 1)
        } else if (operation == "addition") {
            setNewQuantity(newQuantity + 1)
        }
    }
    return <div className='order-item-container'>
        <div className='order-item-remove-bttn' onClick={() => deleteProduct(product)}>

        </div>
        <div className='order-item-image' style={{ backgroundImage: `url(${process.env.REACT_APP_API_IMAGES}${product.imageUrls[0]})` }}>

        </div>
        <div className='order-item-details'>
            <span>{product.name}</span>
            <span><b>Rozmiar: </b>{product.height}cm Wys. x {product.width}cm Szer.</span>
            <div id='order-item-quantity-selector'>
                <div id='substract-bttn' className='quantity-bttn' onClick={() => manageQuantity("substraction")}>
                    -
                </div>
                <input type='number' id='number-input' value={quantity}></input>

                <div id='addition-bttn' className='quantity-bttn' onClick={() => manageQuantity("addition")}>
                    +
                </div>
            </div>
        </div>
        <div className='order-item-price'>
            {product.price} zł
            
        </div>
    </div>
}