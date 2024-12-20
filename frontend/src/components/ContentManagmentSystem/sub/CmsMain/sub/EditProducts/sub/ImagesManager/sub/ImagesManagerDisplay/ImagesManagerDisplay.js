import './ImagesManagerDisplay.css';
import {useEffect, useState} from "react";
import LoadingWheel from "../../../../../../../../../LoadingWheel/LoadingWheel";

export default function ImagesManagerDisplay({image, newImages, setNewImages, editedProduct, setEditedProduct,imagesToDelete,setImagesToDelete}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(typeof image !=='object'){
            const img = new Image();
            img.src = image;
            img.onload = () => setIsLoaded(true);
            img.onerror = () => setIsLoaded(false); // Handle error in case the image fails to load
        }else{
            setIsLoaded(true);
        }

    }, [image]); // Re-run the effect if product.imageUrls changes
    function handleImagesRemoval() {
        if (typeof image!=="object") {
            const filteredImages=editedProduct.imageUrls.filter(i=>i!==image.replace(process.env.REACT_APP_API_IMAGES,""));
            setEditedProduct({...editedProduct, imageUrls: filteredImages});
            setImagesToDelete([...imagesToDelete,image.replace(process.env.REACT_APP_API_IMAGES,"")]);
        } else {

            const filteredImages=newImages.filter(i=>{
                return i!==image
            });
            setNewImages(filteredImages);
        }
    }

    return <div className="images-manager-display"
                style={{backgroundImage: `url(${typeof image === 'object' ? URL.createObjectURL(image) : image})`}}>
        {!isLoaded && <LoadingWheel showDarkBackground={false}/>}
        <div className="delete-image-bttn" onClick={() => {handleImagesRemoval()}}></div>
    </div>
}