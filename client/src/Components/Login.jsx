import React from 'react'
import'../Login.css';
import { useState,useEffect,useRef} from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
function Login({stateHandler,routelocation}) {
  const ref=useRef();
  const usernameRegex = /^[a-zA-Z\s]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,}$/;
  const phoneRegex = /^\d{9,}$/;
  const [user,setUser]=useState({
   name:'',
   password:'',
   phone:'' 
  })
  const [validname,setValidName]=useState(true)
  const [validpassword,setValidPassword]=useState(true)
  const [validphone,setValidPhone]=useState(true)
  const [showpassword,setShowPassword]=useState(false)
      const handler=(e)=>{
    console.log(e.target.name)
    console.log(e.target.value)
    setUser({...user,[e.target.name]:e.target.value})
  }
  const togglepassword=()=>{
setShowPassword(!showpassword)
  }
  const logout=()=>{
    //localStorage.setItem('isAuth',false)
    axios.get('http://localhost:5000/logout',{withCredentials:true}).then(res=>{
      stateHandler();
      console.log(res.data)
      window.alert('you are logged out')
    }).catch(error=>
      console.log('error'))
  }

console.log(user)
const apihandler=(event)=>{
  console.log(user)
  event.preventDefault();
  if((user.name=='')|| (user.name.length<3)||(usernameRegex.test(user.name)==false)){
    setValidName(false)
    setUser({...user,name:''})
    console.log('user name invalid',user.name.length,user.name)
    return;
  }
  if((user.password=='')||(user.password.length<4)||(passwordRegex.test(user.password)==false)){
    setValidPassword(false)
    setUser({...user,password:''})
    console.log('user password invalid',user.password.length)
    return;
  }
  if((user.phone=='')|| (user.phone.length<9)||(phoneRegex.test(user.phone)==false)){
    setValidPhone(false)
    setUser({...user,phone:''})
    console.log('user phone invalid')
    return;
  }
  else{
    axios.post("http://localhost:5000/data",user,{withCredentials:true}).then(res=>{
      console.log('data transfered')
      console.log(res.data)
      stateHandler();
      window.alert('sucessfully logged in')
      setValidName(true)
    setValidPassword(true)
    setValidPhone(true)
    setUser({...user,name:'',password:'',phone:''})
      //localStorage.setItem('isAuth','')
     // localStorage.setItem('isAuth',res.data.isAuthenticated)
      //destroyer(res.data.isAuthenticated)
    }).catch(error=>{
      console.log('error')
    })
    
  }

}
useEffect(()=>{
  console.log(' route mounted')
  routelocation('loginn')
  return()=>{
  console.log(' route changed')
  routelocation('')
  };
    },[])
  useEffect(()=>{
      const handlemousedown =(event)=>{
        if(!ref.current.contains(event.target)) {
          setValidName(true)
          setValidPassword(true)
          setValidPhone(true)
          setUser({...user,name:'',password:'',phone:''})
        } 
      }
      document.addEventListener('mousedown',handlemousedown)
      return ()=>{
          document.removeEventListener('mousedown',handlemousedown)
      }
  },[])
  return (
   <div id="container">
    <div id="title"><h1>"WELCOME TO LOGIN SECTION"</h1></div>

    <div id="login">
    <div className='header'><h2>"PLEASE FILL FOLLOWING DETAILS"</h2></div>
          <form>
            <div className='form' ref={ref}>
            <div id={validname?"name":"invalid"}><PersonIcon/><input type="text" placeholder={validname?'Enter your name':'Invalid name'} name='name' onChange={handler} value={user.name} ></input></div>
            <div id={validpassword?"password":"invalid"}><LockIcon onClick={togglepassword}/><input type={showpassword?"text":"password"} placeholder={validpassword?'Enter your password':'Invalid password'}name='password' onChange={handler} value={user.password} ></input></div>
            <div id={validphone?"phone":"invalid"}><PhoneIcon/><input type="phone" placeholder={validphone?'Enter your phone':'Invalid phone'} name='phone' onChange={handler} value={user.phone} ></input></div>
            <button id="loginbtn" onClick={apihandler}>Login</button>
            <button id="signupbtn">Signup</button>
            </div>
          </form>
          </div >
           <div id="logoutdiv"> 
           <button id="logout" onClick={logout}><LogoutIcon/></button>
           <div id='logoutooltip'>Logout</div>
           </div>
  </div>
  )
}

export default Login