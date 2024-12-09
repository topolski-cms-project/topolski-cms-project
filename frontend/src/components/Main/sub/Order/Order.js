import { useState } from 'react';
import './Order.css';
import OrderItem from './OrderItem/OrderItem';
import { checkIfNotInputEmpty, validateNIP, validatePostalCode, validatePhoneNumber, validateEmail } from '../../../InputValidator';

export default function Order({ basket, setBasket }) {
    const [isFormValid, setIsFormValid] = useState({
        isNameValid: true,
        isSurnameValid: true,
        isCompanyNameValid: true,
        isNIPValid: true,
        isStreetValid: true,
        isCityValid: true,
        isPostalCodeValid: true,
        isPhoneNumberValid: true,
        isEmailValid: true,
        isAdditionalInfoValid: true
    })
    const [orderData, setOrderData] = useState({
        name: "",
        surname: "",
        companyName: "",
        NIP: "",
        street: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
        additionalInfo: ""

    })

    async function sendOrder() {
        setIsFormValid({
            isNameValid: checkIfNotInputEmpty(orderData.name),
            isSurnameValid: checkIfNotInputEmpty(orderData.surname),
            isCompanyNameValid: true,
            isNIPValid: checkIfNotInputEmpty(orderData.NIP) ? true : validateNIP(orderData.NIP),
            isStreetValid: checkIfNotInputEmpty(orderData.street),
            isCityValid: checkIfNotInputEmpty(orderData.city),
            isPostalCodeValid: validatePostalCode(orderData.postalCode),
            isPhoneNumberValid: validatePhoneNumber(orderData.phoneNumber),
            isEmailValid: validateEmail(orderData.email),
            isAdditionalInfoValid: true

        })
        console.log(isFormValid)
        if (Object.values(isFormValid).every(value => value === true)) {
            // const response = await fetch(process.env.REACT_APP_ORDER, {
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         basket: basket,
            //         personalData: orderData
            //     })
            // })
            return;
        }

    }

    const handleFieldChange = (e, name) => {

        setOrderData((prevData) => ({
            ...prevData, // Spread the previous state
            [name]: e.target.value // Update only the field that matches the input's name
        }));
    };

    function calculateTotalBasketPrice() {
        let price = 0;
        basket.forEach(i => {
            price += i.product.price * i.quantity;

        });
        return price.toFixed(2);
    }

    return <div id='order-container'>
        <div id='order-container-left'>
            <span className='order-main-label'>PŁATNOŚĆ I WYSYŁKA</span>
            <div id='order-name-container'>
                <form className='order-form'>
                    <label for='order-name'>Imię <span style={{ color: 'red' }}>*</span></label>
                    <input type='text' id='order-name' name='order-name' className={isFormValid.isNameValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "name")} />
                </form>
                <form className='order-form'>
                    <label for='order-name'>Nazwisko <span style={{ color: 'red' }}>*</span></label>
                    <input type='text' id='order-surname' name='order-surname' className={isFormValid.isSurnameValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "surname")} />
                </form>
            </div>
            <div id='order-company'>
                <form className='order-form'>
                    <label for='order-company-name'>Nazwa Firmy </label>
                    <input type='text' id='order-company-name' name='order-company-name' className='order-input' onChange={(e) => handleFieldChange(e, "companyName")} />
                </form>
                <form className='order-form'>
                    <label for='order-nip'>NIP </label>
                    <input type='text' id='nip' name='nip' className={isFormValid.isNIPValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "NIP")} />
                </form>
            </div>
            <label for='order-street' className='order-label'>Ulica (nazwa ulicy, numer budynku / numer lokalu) <span style={{ color: 'red' }}>*</span></label>
            <input type='text' id='order-street' name='order street' className={isFormValid.isStreetValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "street")} />

            <label for='order-city' className='order-label'>Miasto <span style={{ color: 'red' }}>*</span></label>
            <input type='text' id='order-city' name='order-city' className={isFormValid.isCityValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "city")}></input>
            
            <label for='order-post-code' className='order-label'>Kod pocztowy <span style={{ color: 'red' }}>*</span></label>
            <input type='text' id='order-post-code' name='order-post-code' className={isFormValid.isPostalCodeValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "postalCode")}></input>
            
            <label for='order-phone-numer' className='order-label'>Telefon <span style={{ color: 'red' }}>*</span></label>
            <input type='text' id='order-phone-number' name='order-phone-number' className={isFormValid.isPhoneNumberValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "phoneNumber")}></input>
            
            <label for='order-phone-email' className='order-label'>E-mail <span style={{ color: 'red' }}>*</span></label>
            <input type='email' id='order-phone-email' name='order-phone-email' className={isFormValid.isEmailValid ? 'order-input' : 'order-input incorrect-data'} onChange={(e) => handleFieldChange(e, "email")}></input>
            
            <span className='order-main-label' id='order-additional-info-label'>INFORMACJE DODATKOWE</span>
            
            <label for='order-additional-info' className='order-label' onChange={(e) => handleFieldChange(e, "additionalInfo")}>Uwagi do zamówienia (opcjonalne)</label>
            <textarea id='order-additional-info' name='order-additional-info'></textarea>
        </div>
        <div id='order-container-right'>
            <span id='your-order-label'>TWOJE ZAMOWIENIE</span>
            <div id='checkout-container'>

                <div id='order-sumup-label'>
                    <span>PRODUKT</span>
                    <span>KWOTA</span>
                </div>
                <div id='order-sumup-products-container'>
                    {
                        basket.map(i => <OrderItem product={i.product} quantity={i.quantity} basket={basket} setBasket={setBasket} />)
                    }
                </div>
                <div id='order-sumup-price'>
                    <span style={{ fontSize: '1.1em' }}>Kwota</span>
                    <span style={{ fontSize: '1.1em', fontWeight: '500', color: 'rgba(255,0,0,0.7)' }}>{calculateTotalBasketPrice()} zł</span>
                </div>
                <div id='order-sumup-delivery'>

                </div>
                <div id='order-sumup-total'>
                    <span style={{ fontSize: '1.2em' }}>Łącznie</span>
                    <span style={{ fontSize: '1.3em', color: 'red', fontWeight: '500' }}>1732,60 zł</span>
                </div>
                <div id='complete-order-bttn' onClick={()=>sendOrder()}>
                    KUPUJĘ I PŁACĘ
                </div>
            </div>
        </div>
    </div>
}