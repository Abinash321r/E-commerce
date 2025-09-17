import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';
function ProtectedRoute({isAuthenticated}){
  // const isAuth=JSON.parse(localStorage.getItem('isAuth'))
   console.log(isAuthenticated)
   if(isAuthenticated===false||null){
     window.alert('Please log in first')
  }
return(
isAuthenticated?<Outlet/>:<Navigate to='/login'/>
)}
export default ProtectedRoute