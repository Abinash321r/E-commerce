import React from 'react'
import{Routes,Route} from "react-router-dom";
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import About from './About';
import Library from './Library';
import Comment from './Comment';
import History from './History';
import Product from './Product';
import { useState,useEffect} from 'react';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import HistoryProtected from './HistoryProtected';
import CheckoutForm from './CheckoutForm';
import Return from './Return';
import axios from 'axios';
import _ from 'lodash';
function Router({counter,routelocation}) {
    const [cart,setCart]=useState([])
    const [state,setState]=useState(false)
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)
    const addCart=(product)=>{
      if(isAuthenticated==true){
      const updatedArray = _.uniqBy([...cart,{...product,quantity:1}], 'id');
      setCart(updatedArray);
      counter(updatedArray.length);
      }
      else{
        window.alert('Please Login first!')
      }
      }

      const [api,setApi]=useState([])
      /*const postApi=(quantity)=>{
      //  e.preventDefault();
        setApi(quantity)
        console.log(api)
      }*/
      const stateHandler=()=>{
        setState(!state)
      }
      useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api`,{withCredentials:true}).then(res=>{
          console.log(res.data)
          setIsAuthenticated(res.data.isAuthenticated)
          setIsAdmin(res.data.isAdmin)
       }).catch(error=>
         console.log('error'))
      },[state])
      // <Route path='/About' element={<About/>}/>
  return (
    <div id='route'>
      <Routes>
      <Route path='/' element={<Home addCart={addCart} routelocation={routelocation}/>}></Route>
      <Route path='/contact' element={<Contact routelocation={routelocation}/>} ></Route>
      <Route path='/login' element={<Login stateHandler={stateHandler} routelocation={routelocation}/>}></Route>
      <Route path='/about' element={<About routelocation={routelocation}/>}></Route>
      <Route element={<AdminProtectedRoute isAdmin={isAdmin}/>}>
          <Route path='/dashboard' element={<Dashboard   api={api} />}></Route>
      </Route>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/Library' element={<Library/>}></Route>
      </Route>
      <Route element={<HistoryProtected length={cart.length}/>}>
         <Route path='/History' element={<History cart={cart} />}></Route>
      </Route>
      <Route path='/Comment' element={<Comment/>}></Route>
      <Route path='/Product' element={<Product addCart={addCart}/>}></Route>
      <Route path="/checkout" element={<CheckoutForm/>} />
       <Route path="/return" element={<Return/>} />
    </Routes>
    </div>
  )
}

export default Router