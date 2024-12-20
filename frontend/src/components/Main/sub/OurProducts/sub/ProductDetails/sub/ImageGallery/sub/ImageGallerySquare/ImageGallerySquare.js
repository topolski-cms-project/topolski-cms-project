import './ImageGallerySquare.css';

export default function ImageGallerySquare({url,imagesArr,activeImage,setActiveImage,index, visibleSquareRange}) {
    return <div 
        className={imagesArr[activeImage] == url ? 'image-gallery-squares image-gallery-square-active' : 'image-gallery-squares'}
        style={{
            backgroundImage: `url(${url})`,
            top: `${(index*9)+index}vw`,
            translate: `0 ${visibleSquareRange*10}vw`
            

        }} onClick={() => setActiveImage(index)}>


    </div >
}