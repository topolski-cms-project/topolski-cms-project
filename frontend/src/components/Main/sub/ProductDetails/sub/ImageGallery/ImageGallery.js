import { useEffect } from 'react';
import { useState } from 'react';
import './ImageGallery.css';


export default function ImageGallery({ product }) {
    const [imagesArr, setImagesArr] = useState(undefined);
    const [activeImage, setActiveImage] = useState();

    useEffect(() => {
        const arr = [];
        if (product !== undefined && imagesArr == undefined) {
            product.imageUrls.forEach(image => {
                arr.push(`http://localhost:8080/api/images/${image}`)
            });
            setImagesArr(arr);

            console.log("ok")


        }
        if (imagesArr !== undefined) setActiveImage(imagesArr[0]);
    }, [imagesArr])

    return <div id='image-gallery-container'>
        {imagesArr != undefined ? <>
            <div id='image-gallery-left'>
                <div id='image-gallery-square-1' className={activeImage == imagesArr[0] ? 'image-gallery-squares image-gallery-square-active' : 'image-gallery-squares'}
                    style={{
                        backgroundImage: `url(${imagesArr[0]})`

                    }} onClick={() => setActiveImage(imagesArr[0])}>

                </div>
                <div id='image-gallery-square-2' className={activeImage == imagesArr[1] ? 'image-gallery-squares image-gallery-square-active' : 'image-gallery-squares'}
                    style={{
                        backgroundImage: `url(${imagesArr[1]})`
                    }} onClick={() => setActiveImage(imagesArr[1])}>

                </div>
                <div id='image-gallery-square-3' className={activeImage == imagesArr[2] ? 'image-gallery-squares image-gallery-square-active' : 'image-gallery-squares'}
                    style={{
                        backgroundImage: `url(${imagesArr[0]})`
                    }} onClick={() => setActiveImage(imagesArr[0])}>

                </div>
                <div id='image-gallery-nav'>
                    <div id='image-gallery-nav-up' className='image-gallery-nav-bttn'>

                    </div>
                    <div id='image-gallery-nav-down' className='image-gallery-nav-bttn'>

                    </div>
                </div>

            </div>
            <div id='image-gallery-right'>
                <div id='image-gallery-main'
                    style={{
                        backgroundImage: `url(${activeImage})`
                    }}>

                </div>
            </div>
        </> : <></>}

    </div>


}