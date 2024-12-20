import './ImageCarousel.css'

export default function ImageCarousel({ activeImage, imagesArr }) {
    return <>
        {imagesArr.map((i, index) => {
            return <div className='image-carousel-element slider-image'
                key={index}
                style={{
                    backgroundImage: `url(${i})`,
                    translate: `${(index - activeImage) * 103}%`,
                }}>

            </div>
        })}

    </>
}