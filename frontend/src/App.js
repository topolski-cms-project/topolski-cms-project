import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useEffect, useState } from 'react';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tabChoice, setTabChoice] = useState("browse");
  const [displayBasket, setDisplayBasket] = useState(false);
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    console.log(basket);
  }, [basket])
  return (
    <div className="App">


      <div id='bar'>Dostępne od ręki! Wysyłka 24H!</div>
      <Header setSelectedProduct={setSelectedProduct} setTabChoice={setTabChoice} setDisplayBasket={setDisplayBasket} tabChoice={tabChoice} />
      <Main selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} tabChoice={tabChoice} displayBasket={displayBasket} setDisplayBasket={setDisplayBasket}
        basket={basket} setBasket={setBasket} />


    </div>
  );
}

export default App;
