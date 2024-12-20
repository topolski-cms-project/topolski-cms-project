import './ImagesManager.css';
import ImagesManagerDisplay from "./sub/ImagesManagerDisplay/ImagesManagerDisplay";
import ImagesManagerAdd from "./sub/ImagesManagerAdd/ImagesManagerAdd";
import {useEffect, useState} from "react";

export default function ImagesManager({newImages,setNewImages,imagesToDisplay,editedProduct,setEditedProduct,imagesToDelete,setImagesToDelete}) {


    return <div id='images-manager'>
        {imagesToDisplay.length>0 ? imagesToDisplay.map((i,index)=>{
            return <ImagesManagerDisplay image={i} key={index}
            newImages={newImages} setNewImages={setNewImages}
            editedProduct={editedProduct} setEditedProduct={setEditedProduct}
            imagesToDelete={imagesToDelete} setImagesToDelete={setImagesToDelete}/>
        }) : <></>}

        <ImagesManagerAdd newImages={newImages} setNewImages={setNewImages} />
    </div>
}