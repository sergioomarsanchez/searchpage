import './App.css';
import React, { useState, useEffect } from 'react'
import {arrayProductos} from './data'


function App() {
const [displayed, setDisplayed] = useState(arrayProductos)
const [input, setInput] = useState('')
const [busquedas, setBusquedas] = useState([])

useEffect(() => {

  setTimeout(() => {
      busquedas.forEach(b=>{
    if( !isNaN(Number(b))){console.log(b, 'en onclick foreach')
    setDisplayed(arrayProductos.filter(p=>{if(p.code.toString().includes(b))return p }))
  
    } else {
    setDisplayed(arrayProductos.filter(p=>{if(p.name.toLowerCase().includes(b.toLowerCase()))return p }))
  
  }})
  if(!busquedas.length)setDisplayed(arrayProductos)
  }, 3000);

}, [busquedas])


function handleOnChange(e){
  setInput(e.target.value)
}
console.log(input)
function handleOnClick(){ 
  if(input!=='') {setBusquedas([...busquedas, input])}
  setInput('')
}
function handleClose(e){
  console.log(e.target.value)
  setBusquedas(busquedas.filter(b=>{if(b!==e.target.value)return b}))
}


console.log(displayed)
console.log(busquedas, 'busquedas')

  return (
    <div className="App">
      <div className='searchBar'>
        <input className='input' value={input} onChange={(e)=>{handleOnChange(e)}}></input>
        <div onClick={()=>handleOnClick()} className='button'><img src='img/lupa.png' alt=''/>Buscar</div>
         </div>
         <div className='busquedasContainer'>
           {busquedas.length? busquedas.map(b=>{return <div className='busquedas'>{b}<button value={b} onClick={(e)=>{handleClose(e)}}>x</button></div>}):null}
           </div>
      <div className='cardsContainer'>
      {displayed.length? displayed.map((e)=>{
        return(
          <div key={e.code} className='productCard'>
            <div className='img'>
          <img src={e.image} alt='' />

            </div>
          <div className='text'>
            <h4>{e.name}</h4>
            <span className='code'>CODE{e.code}</span>
            <div><span className='price'>Precio: </span><span className='number'>${e.price}</span></div>
          </div>
        </div>)
      }) :<div>Ningún producto encontrado</div>}
      </div>
      <div className='divisor'></div>
      <div className='resultados'>{displayed.length} resultados</div>
    </div>
  );
}

export default App;
