import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';
function HistoryProtected({length}) {
    console.log(length)
    if(length===0){
        window.alert("please add to cart first")
    }
  return (
    length!==0?<Outlet/>:<Navigate to='/'/>
  )
}

export default HistoryProtected