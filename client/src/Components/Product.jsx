import React from 'react'
import '../Product.css'
import { useLocation } from 'react-router-dom'
function Product({addCart}) {
  const {state}=useLocation()
 // const array=state.filteritems
  return (
    <>
    {
    state===null?<div> Page not found</div>:
    <>
    { Array.isArray(state.filteritems)?
      <div id='productcontainer'>
      {state.filteritems.map((product,index)=>{
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
</div>:
    <div id="element" >
    <div id="image">
  <img src={state.filteritems.image} id='img'></img>
  </div>
  <div id="description">
  <div id='title'>{state.filteritems.title}</div>
  <div>{state.filteritems.description}/-</div>
  <div>Price:${state.filteritems.price}/-</div>
  <button id="cart" onClick={()=>addCart(state.filteritems)}>Add to cart</button>
  </div>
 </div>

    }
    </>
}
  </>
  )
}

export default Product