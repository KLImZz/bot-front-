import logo from './logo.svg';
import './App.css';
import {React, useEffect} from 'react'
import {Routes, Route} from "react-router-dom";
import {Header} from './components/Header/Header'
import {ProductList} from './components/ProductList/ProductList'
import {Form} from './components/Form/Form'
const tg = window.Telegram.WebApp;

function App() {
  useEffect(()=>{
    tg.ready()
  }, [])
  const closeEvent =()=>{
    tg.close()
  }
  return (
    <div className="App">
     <div className='container' >
      <Header/>
      <Routes> 
        <Route index element = {<ProductList/>}/>
        <Route path = {'/form'} element = {<Form/>}/>
      </Routes>
      <button className='btn' onClick={closeEvent}>Закрыть</button>
     </div>
    </div>
  );
}
 

export default App;
