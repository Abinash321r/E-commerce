import React from 'react'
import'../Home.css';
//import products from'../Products.json'
import Searchbar from './Searchbar';
import {useState,createContext,useEffect} from 'react';
import LoadingSkeleton from './LoadingSkeleton';
const Contex=createContext();
function Home({addCart,routelocation}) {
  const [sekeleton,setSkeleton]=useState(true);
  const [state,setState]=useState(false);
    const [products,setProducts]=useState('');

    
  useEffect(()=>{

    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    setProducts(data)
    console.log(data)});


    setTimeout(()=>{
      setSkeleton(false)
    },2000)
console.log(' route mounted')
routelocation('homee')
return()=>{
console.log(' route changed')
routelocation('')
setState(false)
};

  },[])
  
  return (
    <>
    <div id="hello">
      <Searchbar/>
     {sekeleton? <LoadingSkeleton/>:<div className='elementcontainer'>
        {
          products.slice().map((product,index)=>{
           // console.log(product.image)
            return(
              
              <div id="element" key={index}>
                <div id="image">
              <img src={product.image} id='img'></img>
              </div>
              <div id="description">
              <div id='title'>{product.title}</div>
              <div>{product.description}/-</div>
              <div id='price'>Price:${product.price}/-</div>
              <button id="cart" onClick={()=>addCart(product)}>Add to cart</button>
              </div>
             </div>
             
            )

          })
        }
        </div>}
    </div>
    </>
  )
}

export default Home
export{Contex}
//
