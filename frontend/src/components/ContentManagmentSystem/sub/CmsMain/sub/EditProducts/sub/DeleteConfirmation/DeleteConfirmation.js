import './DeleteConfirmation.css'
import {useState} from "react";
import MessagePopup from "../../../../../../../MessagePopup/MessagePopup";

export default function DeleteConfirmation({setShowDeleteConfirmation, deleteProduct}) {


    return <>
        <div id='delete-confirmation-container'>


            <>
                <span>Czy napewno chcesz usunąć ten produkt?</span>
                <span>Tej akcji <b>nie można cofnąć</b></span>
                <div id='delete-confirmation-bttns-container'>
                    <div id='delete-confirmation-yes-bttn' className='delete-confirmation-bttn'
                         onClick={() => deleteProduct()}>
                        TAK
                    </div>
                    <div id='delete-confirmation-no-bttn' className='delete-confirmation-bttn'
                         onClick={() => setShowDeleteConfirmation(false)}>
                        NIE
                    </div>
                </div>
            </>

        </div>

    </>
}