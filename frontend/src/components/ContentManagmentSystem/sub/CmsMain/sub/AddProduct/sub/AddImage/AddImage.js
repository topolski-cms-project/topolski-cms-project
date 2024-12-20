import './AddImage.css';
import { useState, useEffect } from 'react';

export default function AddImage({ setImages, images,translate }) {

    return <div id="add-image-container"  style={{left:`${(25*images.length)+2.3}%`, transform:`translateX(${translate}%)`}}>
            <input
                onChange={(e)=>{setImages([...images,...Array.from(e.target.files)])}}
                accept="image/png, image/jpeg, image/jpg"
                type="file"
                id="file-upload"
                name="file-upload"
                hidden
                multiple
            />
            <label
                htmlFor='file-upload'
                id='file-upload-label'

            ></label>
        </div>

}
