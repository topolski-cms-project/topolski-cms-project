import './AddProduct.css';
import AddImage from "./sub/AddImage/AddImage";
import {useEffect, useState} from 'react';
import DisplayImages from "./sub/DisplayImages/DisplayImages";
import AddProductDetails from "./sub/AddProductDetails/AddProductDetails";
import {checkIfNotInputEmpty} from "../../../../../InputValidator";

export default function AddProduct() {
    const [images, setImages] = useState([]); // Holds selected images
    const [newProductID, setNewProductID] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        height: 0,
        width: 0,
        depth: 0,
        amount: 0,
        description: "",
        images: images,
    })
    const [isFormValid, setIsFormValid] = useState({
        name: true,
        price: true,
        height: true,
        width: true,
        depth: true,
        amount: true,
        description: true,
        images: true
    });

    function validateProductDetailsInputs() {
        setIsFormValid({
            name: checkIfNotInputEmpty(newProduct.name),
            price: checkIfNotInputEmpty(newProduct.price),
            height: checkIfNotInputEmpty(newProduct.height),
            width: checkIfNotInputEmpty(newProduct.width),
            depth: checkIfNotInputEmpty(newProduct.depth),
            amount: checkIfNotInputEmpty(newProduct.amount),
            description: checkIfNotInputEmpty(newProduct.description),
            images: images.length > 0
        });


    }

    async function addNewProduct() {
        validateProductDetailsInputs();
        if (Object.values(isFormValid).every(value => value === true)) {
            // console.log({
            //     name: typeof newProduct.name,
            //     price:  typeof parseFloat(newProduct.price),
            //     description:  typeof newProduct.description,
            //     material:  typeof "",
            //     width:  typeof parseFloat(newProduct.width),
            //     height:  typeof parseFloat(newProduct.height),
            //     depth:  typeof parseFloat(newProduct.depth),
            //     quantity:  typeof parseInt(newProduct.amount)
            // })
            console.log({
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                description: newProduct.description,
                material: "",
                width: parseFloat(newProduct.width),
                height: parseFloat(newProduct.height),
                depth: parseFloat(newProduct.depth),
                quantity: parseInt(newProduct.amount)
            })
            try {
                const response = await fetch(process.env.REACT_APP_API_ADMIN_ADD_NEW_PRODUCT, {
                    method: "POST",
                    headers:{
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: newProduct.name,
                        price: parseFloat(newProduct.price),
                        description: newProduct.description,
                        material: "asd",
                        width: parseFloat(newProduct.width),
                        height: parseFloat(newProduct.height),
                        depth: parseFloat(newProduct.depth),
                        quantity: parseInt(newProduct.amount)
                    })
                })
                const data = await response.json();
                console.log(data);
            }catch(err) {
                console.error(err);
            }
        }
    }


    return (
        <div id='add-product-container'>
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
