import './AddProduct.css';
import AddImage from "./sub/AddImage/AddImage";
import {useEffect, useState} from 'react';
import DisplayImages from "./sub/DisplayImages/DisplayImages";
import AddProductDetails from "./sub/AddProductDetails/AddProductDetails";
import {checkIfNotInputEmpty} from "../../../../../InputValidator";
import MessagePopup from "../../../../../MessagePopup/MessagePopup";
import LoadingWheel from "../../../../../LoadingWheel/LoadingWheel";

export default function AddProduct() {
    const [wasProductAdded, setWasProductAdded] = useState(false);
    const [images, setImages] = useState([]); // Holds selected images
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: null,
        height: null,
        width: null,
        depth: null,
        amount: null,
        material: "",
        description: ""
    })
    const [isFormValid, setIsFormValid] = useState({
        name: true,
        price: true,
        height: true,
        width: true,
        depth: true,
        amount: true,
        description: true,
        material: true,
        images: true
    });

    function clearData() {
        setImages([]);
        setNewProduct({
            name: "",
            price: null,
            height: null,
            width: null,
            depth: null,
            amount: null,
            material: "",
            description: ""
        })
        setIsFormValid({
            name: true,
            price: true,
            height: true,
            width: true,
            depth: true,
            amount: true,
            description: true,
            material: true,
            images: true
        })
    }

    function validateProductDetailsInputs() {
        setIsFormValid({
            name: checkIfNotInputEmpty(newProduct.name),
            price: checkIfNotInputEmpty(newProduct.price),
            height: checkIfNotInputEmpty(newProduct.height),
            width: checkIfNotInputEmpty(newProduct.width),
            depth: checkIfNotInputEmpty(newProduct.depth),
            amount: checkIfNotInputEmpty(newProduct.amount),
            description: checkIfNotInputEmpty(newProduct.description),
            material: checkIfNotInputEmpty(newProduct.material),
            images: images.length > 0
        });


    }

    async function addNewProduct() {
        validateProductDetailsInputs();
        if (Object.values(isFormValid).every(value => value === true)) {
            setShowLoadingScreen(true);
            try {
                const response = await fetch(process.env.REACT_APP_API_ADMIN_ADD_NEW_PRODUCT, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: newProduct.name,
                        price: parseFloat(newProduct.price),
                        description: newProduct.description,
                        material: newProduct.material,
                        width: parseFloat(newProduct.width),
                        height: parseFloat(newProduct.height),
                        depth: parseFloat(newProduct.depth),
                        quantity: parseInt(newProduct.amount),
                    })
                })
                const productData = await response.json();
                if (response.ok) {


                    try {
                        for (const img of images) {

                            const formData = new FormData();
                            formData.append('file', img);
                            const response = await fetch(`${process.env.REACT_APP_API_ADMIN_ADD_NEW_IMAGE}${productData.id}/image`, {
                                method: "POST",
                                body: formData,
                            })
                            if (!response.ok) {
                                const errorData = await response.text(); // Use `.text()` for error responses
                                console.error(`Failed to upload image: ${errorData}`);
                                return;
                            }

                            const data = await response.json();
                            setWasProductAdded(true);
                            clearData()
                            setShowLoadingScreen(false);
                        }
                    } catch
                        (err) {
                        console.log(err)
                    }
                }
            } catch
                (err) {
                console.error(err);
            }

        }
    }


    return (
        <div id='add-product-container'>
            {showLoadingScreen ? <LoadingWheel showDarkBackground={true}/> : <></>}
            {wasProductAdded ?
                <MessagePopup message="Produkt dodano pomyślnie" supportFunction={setWasProductAdded}/> : <></>}
            <div id='add-images-container' className={isFormValid.images ? '' : 'invalid-input'}>
                {images !== undefined && images.length > 0 ? images.map((image, index) => {
                    return <DisplayImages index={index} key={index} image={image}
                                          setImages={setImages} images={images}/>;
                }) : <></>}
                <AddImage setImages={setImages} images={images}/>
            </div>
            <div id='add-product-details-container'>
                <AddProductDetails newProduct={newProduct} setNewProduct={setNewProduct}
                                   isFormValid={isFormValid} validateProductDetailsInputs={validateProductDetailsInputs}
                                   addNewProduct={addNewProduct}/>
            </div>
        </div>
    );
}
