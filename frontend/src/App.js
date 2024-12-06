import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useState } from 'react';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="App">
      

      <div id='bar'>Dostępne od ręki! Wysyłka 24H!</div>
      <Header  setSelectedProduct={setSelectedProduct}/>
      <Main selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>


    </div>
  );
}

export default App;
