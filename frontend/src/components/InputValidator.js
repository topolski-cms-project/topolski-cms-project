export function checkIfNotInputEmpty(input){
    return input.trim().length>0
}

export function validateNIP(input){
    return input.length==10
}

export function validatePostalCode(input){
    const postalCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
    return checkIfNotInputEmpty(input) && postalCodeRegex.test(input);
}

export function validatePhoneNumber(input){
    const phoneRegex = /^(?:\+48)?\s?\d{3}[-\s]?\d{3}[-\s]?\d{3}$/;
    return checkIfNotInputEmpty(input) && phoneRegex.test(input);
}

export function validateEmail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return checkIfNotInputEmpty(input) &&emailRegex.test(input);
}