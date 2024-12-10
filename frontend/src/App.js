import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useEffect, useState } from 'react';


function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tabChoice, setTabChoice] = useState("browse");
  const [displayBasket, setDisplayBasket] = useState(false);
  const [basket, setBasket] = useState(getCookieFromBasket()!=="" ? getCookieFromBasket() : []);
  
  
 



  useEffect(()=>{ 
    if(tabChoice=="basket"){
      setDisplayBasket(false);
    }
  },[tabChoice])

  useEffect(()=>{
    const currentDate = new Date();
    currentDate.setUTCDate(currentDate.getUTCDate() + 7); // Add 7 days to the current date
    document.cookie=`basket=${JSON.stringify(basket)};expires=${currentDate.toUTCString()}`;

  },[basket])

  function getCookieFromBasket(){
    const basketCookie = document.cookie.split(';')[0].replace("basket=","");
    return basketCookie=="" ? "" : JSON.parse(basketCookie);
  }
 
  return (
    <div className="App">


      <div id='bar'>Dostępne od ręki! Wysyłka 24H!</div>
      <Header setSelectedProduct={setSelectedProduct} setTabChoice={setTabChoice} setDisplayBasket={setDisplayBasket} tabChoice={tabChoice} basket={basket} />
      <Main selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} tabChoice={tabChoice} displayBasket={displayBasket} setDisplayBasket={setDisplayBasket}
          basket={basket} setBasket={setBasket} setTabChoice={setTabChoice}/>


    </div>
  );
}

export default App;
