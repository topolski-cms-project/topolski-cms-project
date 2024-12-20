import './MessagePopup.css';
import {useEffect, useState} from "react";

export default function MessagePopup({message,supportFunction}) {
    const [popupVisibility,setPopupVisibility] = useState("message-popup-invisible");

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setPopupVisibility("message-popup-visible");
        }, 50);

        const timer2 = setTimeout(() => {
            setPopupVisibility("message-popup-invisible");

        }, 2050); // 300 + 3000 = 3300ms to hide after 3s

        const timer3 = setTimeout(() => {
            supportFunction(false);
        },2350);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);

        };
    }, []);

    return <div id='message-popup' className={popupVisibility}>
        <div id='message-popup-icon'></div>
        <span id='message-popup-text'>{message}</span>
    </div>
}