import { act, useEffect } from 'react';
import { useState } from 'react';
import './ImageGallery.css';
import ImageGallerySquare from './sub/ImageGallerySquare/ImageGallerySquare';
import ImageCarousel from './sub/ImageCarousel/ImageCarousel';


export default function ImageGallery({ product }) {
    const [imagesArr, setImagesArr] = useState(undefined);
    const [activeImage, setActiveImage] = useState();
    const [visibleSquareRange, setVisibleSquareRange] = useState(0);
    const [translateRange, setTranslateRange] = useState("0");


    useEffect(() => {
        const arr = [];
        if (product !== undefined && imagesArr == undefined) {
            product.imageUrls.forEach(image => {
                arr.push(`http://localhost:8080/api/images/${image}`)
            });
            setImagesArr(arr);
        }
        if (imagesArr !== undefined) setActiveImage(imagesArr[0]);
    }, [imagesArr])

    function handleVisibleSquareRange(operation) {

        if (operation == "move-up" && visibleSquareRange <0) {
            setVisibleSquareRange(visibleSquareRange + 1)
        }
        if (operation == "move-down" && visibleSquareRange > 3-imagesArr.length) {
            setVisibleSquareRange(visibleSquareRange - 1)
        }
    }


    return <div id='image-gallery-container'>
        {imagesArr != undefined ? <>
            <div id='image-gallery-left'>
                {
                    imagesArr.map((i, index) => {
                        return <ImageGallerySquare key={index} index={index} url={i} setActiveImage={setActiveImage} activeImage={activeImage}
                            visibleSquareRange={visibleSquareRange} imagesArr={imagesArr}/>
                    })
                }
                <div id='image-gallery-nav'>
                    <div id='image-gallery-nav-up' className='image-gallery-nav-bttn' onClick={() => handleVisibleSquareRange("move-up")}>

                    </div>
                    <div id='image-gallery-nav-down' className='image-gallery-nav-bttn' onClick={() => handleVisibleSquareRange("move-down")}>

                    </div>
                </div>

            </div>
            <div id='image-gallery-right'>
                <ImageCarousel activeImage={activeImage} imagesArr={imagesArr}/>
            </div>
        </> : <></>}

    </div>


}