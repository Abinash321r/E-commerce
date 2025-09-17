
import React,{Component} from 'react'
import { useState } from 'react'
import '../History.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function History({cart,postApi}) {
  const navigate=useNavigate()
  console.log(cart)
  const[quantity,setQuantity]=useState(cart)
  const [clientSecret, setClientSecret] = useState('');
console.log(quantity)
const totalPrice=quantity.reduce((price,product)=>price+product.quantity*product.price,0).toFixed(3);

const Increment=(product)=>{
  console.log(product.id)
  const newQuantity=quantity.map((item)=>(
  item.id===product.id?{...item,quantity:item.quantity+1}:item
  ))
  console.log(newQuantity)
  setQuantity(newQuantity)
}
const Decrement=(product)=>{
  console.log(product.id)
  const newQuantity=quantity.map((item)=>(
  item.id===product.id?{...item,quantity:item.quantity===1?item.quantity:item.quantity-1}:item
  ))
  setQuantity(newQuantity)
  }
  //
  const checkout=(quantity)=>{
    navigate('/checkout',{state:{quantity}})
  }
  return (
    <div id='cartcontainer'>
    {
      quantity.map((product,index)=>{
        return(
          <div id='cartelement' key={index}> 
          <div id="cartelementimage">
           <img src={product.image} id='image'></img>
          </div>
           <div id="cartelementdescription">
          <div>{product.title}</div>
          <div>price:${product.price*product.quantity}/-</div>
          <div>quantity:{product.quantity}</div>
          <button style={{width:"80px",height:"30px"}} onClick={()=>Increment(product)}>+</button>
          <button style={{width:"80px",height:"30px"}} onClick={()=>Decrement(product)}>-</button>
          </div>
          </div>
        )
      })
    }
    <div className="checkoutbox">
    <div>Totalprice:${totalPrice}/-</div>
    <button onClick={()=>{checkout(quantity)}}>checkout</button>
    </div>
    </div>
  )
  }
export default History