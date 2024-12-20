import './EditProducts.css'
import ProductBar from "./sub/ProductBar/ProductBar";
import {useEffect, useState} from "react";
import ImagesManager from "./sub/ImagesManager/ImagesManager";
import MessagePopup from "../../../../../MessagePopup/MessagePopup";
import DeleteConfirmation from "./sub/DeleteConfirmation/DeleteConfirmation";
import LoadingWheel from "../../../../../LoadingWheel/LoadingWheel";

export default function EditProducts() {
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [imagesToDisplay, setImagesToDisplay] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [wasProductEdited, setWasProductEdited] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [wasProductDeleted, setWasProductDeleted] = useState(false)
    const [showLoadingScreen,setShowLoadingScreen] = useState({
        delete:false,
        edit:false,
        fetch:false
    });

    function clearData(){
        setEditedProduct(null);
        setNewImages([]);
        setImagesToDelete([]);
        setImagesToDelete([]);
    }



    async function deleteProduct() {
        try {
            setShowLoadingScreen({...showLoadingScreen, delete:true});
            const response = await fetch(`${process.env.REACT_APP_API_ADMIN_DELETE_PRODUCT}${editedProduct.id}`, {
                method: 'DELETE',
            })
            if (response.status === 200) {
                setWasProductDeleted(true);
                fetchProducts();

            }
            clearData();
            setShowDeleteConfirmation(false);
            setShowLoadingScreen({...showLoadingScreen, delete:false});
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchProducts() {
        setShowLoadingScreen({...showLoadingScreen, fetch:true});
        const response = await fetch(process.env.REACT_APP_API_ADMIN_GET_PRODUCTS, {
            method: 'GET', headers: {
                "contet-type": "application/json"
            }
        });
        const data = await response.json();
        setProducts(data);
        setShowLoadingScreen({...showLoadingScreen, fetch:false});
    }

    async function editProduct() {
        setShowLoadingScreen({...showLoadingScreen, edit:true});
        const response = await fetch(`${process.env.REACT_APP_API_ADMIN_EDIT_PRODUCTS}${editedProduct.id}`, {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedProduct)
        })
        if (response.ok && newImages.length > 0) {
            for (const image of newImages) {
                const formData = new FormData();
                formData.append("file", image);

                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_ADMIN_ADD_NEW_IMAGE}${editedProduct.id}/image`, {
                            method: "POST",
                            body: formData, // FormData automatically sets the Content-Type
                        }
                    );

                    if (!response.ok) {
                        const errorData = await response.text(); // Use `.text()` for error responses
                        console.error(`Failed to upload image: ${errorData}`);
                        return;
                    }

                    const data = await response.json();
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            }
        }
        if (imagesToDelete.length > 0) {
            for (const image of imagesToDelete) {
                const response = await fetch(`${process.env.REACT_APP_API_ADMIN_DELETE_IMAGES}${editedProduct.id}/image?imageUrl=${image}`, {
                    method: 'DELETE'
                })
                if (!response.ok) {
                    console.error("Error deleting image")
                }
            }
        }
        setShowLoadingScreen({...showLoadingScreen, edit:false});
        setWasProductEdited(true);
        fetchProducts();
        clearData();

    }

    useEffect(() => {

        if (editedProduct !== null) {
            const images = [];
            newImages.forEach(image => {
                images.push(image);
            })
            editedProduct.imageUrls.forEach(imageUrl => {
                images.push(`${process.env.REACT_APP_API_IMAGES}${imageUrl}`);
            })
            setImagesToDisplay(images);
        }
    }, [newImages, editedProduct]);

    useEffect(() => {
        fetchProducts();
    }, [])



    return <>
        {showLoadingScreen.delete || showLoadingScreen.edit ? <LoadingWheel showDarkBackground={true}/> : <></>}
        {wasProductDeleted ? <MessagePopup message="Produkt usunięto pomyślnie" supportFunction={setShowDeleteConfirmation}/> : <></>}
        {showDeleteConfirmation ? <DeleteConfirmation deleteProduct={deleteProduct} setShowDeleteConfirmation={setShowDeleteConfirmation}/> : <></>}
        {wasProductEdited ?
            <MessagePopup message={"Zedytowano pomyślnie"} supportFunction={setWasProductEdited}/> : <></>}
        <div id="edit-products-container">

            <div id='edit-products-container-left'>
                {showLoadingScreen.fetch ? <LoadingWheel showDarkBackground={false}/> : <></>}
                {products !== undefined && products.length > 0 ? products.map((p, index) => {
                    return <ProductBar key={index} product={p} setEditedProduct={setEditedProduct}/>
                }) : <></>}
            </div>
            <div id='edit-products-container-right'>
                {editedProduct !== null ?
                    <>
                        <div id='edit-products-top'>
                            <ImagesManager newImages={newImages} setNewImages={setNewImages}
                                           imagesToDisplay={imagesToDisplay}
                                           editedProduct={editedProduct} setEditedProduct={setEditedProduct}
                                           imagesToDelete={imagesToDelete} setImagesToDelete={setImagesToDelete}/>
                        </div>
                        <div id='edit-products-bottom'>

                            <div id='edit-products-bottom-left'>
                                <input type='text'
                                       value={editedProduct.name}
                                       onChange={(e) => {
                                           setEditedProduct({...editedProduct, name: e.target.value})
                                       }}
                                       className='edit-product-input'
                                       id='edit-product-name'/>
                                <input type='number'
                                       value={editedProduct.price}
                                       onChange={(e) => {
                                           setEditedProduct({...editedProduct, price: e.target.value})
                                       }}
                                       className='edit-product-input' id='edit-product-price'/>
                                <div id='edit-products-measurements'>
                                    <input type='number' className='edit-product-input' id='edit-product-height'
                                           value={editedProduct.height}
                                           onChange={(e) => {
                                               setEditedProduct({...editedProduct, height: e.target.value})
                                           }}/>
                                    <input type='number' className='edit-product-input' id='edit-product-width'
                                           value={editedProduct.width}
                                           onChange={(e) => {
                                               setEditedProduct({...editedProduct, width: e.target.value})
                                           }}/>
                                    <input type='number' className='edit-product-input' id='edit-product-depth'
                                           value={editedProduct.depth}
                                           onChange={(e) => {
                                               setEditedProduct({...editedProduct, depth: e.target.value})
                                           }}/>
                                </div>
                                <input type='number' className='edit-product-input' id='edit-product-stock'
                                       value={editedProduct.stockQuantity}
                                       onChange={(e) => {
                                           setEditedProduct({...editedProduct, stockQuantity: e.target.value})
                                       }}/>
                                <input type='text' className='edit-product-input' id='edit-product-material'
                                       value={editedProduct.material}
                                       onChange={(e) => {
                                           setEditedProduct({...editedProduct, material: e.target.value})
                                       }}/>
                                <div id='edit-product-bttns-container'>
                                    <div id='edit-product-bttn' onClick={editProduct}>Edytuj</div>
                                    <div id='delete-product-bttn' onClick={()=>setShowDeleteConfirmation(true)}>Usuń produkt</div>
                                </div>
                            </div>
                            <div id='edit-products-bottom-right'>
                            <textarea id='edit-product-details'
                                      value={editedProduct.description}
                                      onChange={(e) => {
                                          setEditedProduct({...editedProduct, description: e.target.value})
                                      }}/>
                            </div>
                        </div>
                    </>
                    : <></>}
            </div>
        </div>
    </>
}