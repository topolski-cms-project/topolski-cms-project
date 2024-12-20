import './CmsMain.css';
import CmsNavbar from "./sub/CmsNavbar/CmsNavbar";
import {useState} from "react";
import AddProduct from "./sub/AddProduct/AddProduct";
import EditProducts from "./sub/EditProducts/EditProducts";
import Reviews from "../../../Main/sub/OurProducts/sub/ProductDetails/sub/Reviews/Reviews";
import ReviewsManager from "./sub/ReviewsManager/ReviewsManager";

export default function CmsMain(){
    const [currentTab,setCurrentTab] = useState("add-product");
    return <div id='cms-main-container'>
        <div id='cms-main-left'>
            <CmsNavbar setCurrentTab={setCurrentTab} currentTab={currentTab}/>
        </div>
        <div id='cms-main-right'>
            {currentTab === "add-product" ? <AddProduct /> :
            currentTab === "edit-product" ? <EditProducts /> :
            currentTab==='reviews'? <ReviewsManager /> :<></>}

        </div>
    </div>
}