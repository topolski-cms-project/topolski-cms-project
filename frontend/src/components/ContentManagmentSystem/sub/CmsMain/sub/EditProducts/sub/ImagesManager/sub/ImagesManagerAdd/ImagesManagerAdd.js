import './ImagesManagerAdd.css'

export default function ImagesManagerAdd({newImages,setNewImages}) {
    return <div id='images-manager-add-container'>
        <input
            onChange={(e) => {
                setNewImages([...newImages, ...Array.from(e.target.files)])
            }}
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            id="images-manager-add"
            name="images-manager-add"
            hidden
            multiple
        />
        <label
            htmlFor='images-manager-add'
            id='images-manager-add-label'

        ></label>
    </div>
}