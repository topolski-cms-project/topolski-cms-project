import './ContentManagmentSystem.css'
import LoginForm from './sub/LoginForm/LoginFrom';
import CmsMain from './sub/CmsMain/CmsMain';
import {useState} from 'react'

export default function ContentManagmentSystem(){
    const [isLogged,setIsLogged]=useState(true);
    return <div id='cms-container'>
        {isLogged ? <CmsMain />: <LoginForm />}
    </div>
}