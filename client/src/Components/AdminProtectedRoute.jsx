import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
function AdminProtectedRoute({isAdmin}) {
    console.log(isAdmin)
    if(isAdmin===false||null){
        window.alert('you are not admin')
    }
  return (
   isAdmin?<Outlet/>:<Navigate to='/login'/>
  )
}

export default AdminProtectedRoute