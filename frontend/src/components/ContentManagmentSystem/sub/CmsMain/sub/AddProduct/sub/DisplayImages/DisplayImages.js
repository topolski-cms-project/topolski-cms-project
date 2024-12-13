import './DisplayImages.css'

export default function DisplayImages({image,setImages,images}) {
    return <>
        <div className="display-image"
             style={
                 {
                     backgroundImage: `url(${URL.createObjectURL(image)})`,
                 }}>
            <div className="delete-image-bttn" onClick={()=>{setImages(images.filter(i=>i!=image))}}></div>
        </div>
    </>
}