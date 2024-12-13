import './AddProductDetails.css';
import {useState} from "react";
import {checkIfNotInputEmpty} from "../../../../../../../InputValidator";

export default function AddProductDetails({newProduct, setNewProduct, isFormValid, addNewProduct}) {

    return <div id='add-product-details'>
        <div id='add-product-details-left'>
            <input type='text' id='product-details-name-input'
                   className={isFormValid.name ? 'product-details-input' : 'product-details-input invalid-input'}
                   placeholder='Nazwa..'
                   onChange={(e) => {
                       setNewProduct({...newProduct, name: e.target.value})
                   }}/>
            <input type='number' id='product-details-price-input'
                   className={isFormValid.price ? 'product-details-input' : 'product-details-input invalid-input'}
                   placeholder='Cena..' onChange={(e) => {
                setNewProduct({...newProduct, price: e.target.value})
            }}/>
            <div id='product-details-dimensions-container'>
                <input type='number' id='product-details-width-input'

                       className={isFormValid.height ? 'product-details-dimensions-input product-details-input' : 'product-details-dimensions-input product-details-input invalid-input'}
                       placeholder='Wysokość..'
                       onChange={(e) => {
                           setNewProduct({...newProduct, height: e.target.value})
                       }}/>
                <input type='number' id='product-details-height-input'
                       className={isFormValid.width ? 'product-details-dimensions-input product-details-input' : 'product-details-dimensions-input product-details-input invalid-input'}
                       placeholder='Szerokość..'
                       onChange={(e) => {
                           setNewProduct({...newProduct, width: e.target.value})
                       }}/>
                <input type='number' id='product-details-depth-input'
                       className={isFormValid.depth ? 'product-details-dimensions-input product-details-input' : 'product-details-dimensions-input product-details-input invalid-input'}
                       placeholder='Głębokość..'
                       onChange={(e) => {
                           setNewProduct({...newProduct, depth: e.target.value})
                       }}/>
            </div>
            <input type='number' id='product-details-stock-input'
                   className={isFormValid.amount ? 'product-details-input' : 'product-details-input invalid-input'}
                   placeholder="Ilość.."
                   onChange={(e) => {
                       setNewProduct({...newProduct, amount: e.target.value})
                   }}/>
            <div id='product-details-add-bttn' onClick={addNewProduct}>
                Dodaj Produkt
            </div>
        </div>
        <div id='add-product-details-right'>
        <textarea id='product-details-description-input'
                  className={isFormValid.description ? 'product-details-input' : 'product-details-input invalid-input'}
                  placeholder="Opis.."
                  onChange={(e) => {
                      setNewProduct({...newProduct, description: e.target.value})
                  }}/>
        </div>

    </div>
}