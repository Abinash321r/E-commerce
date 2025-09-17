import './App.css';
import{BrowserRouter,Link} from "react-router-dom";
import React, { useState,useEffect} from 'react';
import Slider from './Components/Slider';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import{FaBars}  from "react-icons/fa";
import Router from './Components/Router';
import InfoIcon from '@mui/icons-material/Info';
//import axios from 'axios';
function App() {
  
 const [state, setState]=useState(false);
 const [width, setWidth]=useState(window.innerWidth<=610?0:50);
 const [count,setCount]=useState();
 const [home,setHome]=useState('');
 const [contact,setContact]=useState('');
 const [login,setLogin]=useState('');
 const [register,setRegister]=useState('');
 const [location,setLocation]=useState();

const routelocation =(islocation)=>{
  console.log(islocation)
setHome(islocation==='homee'?'homee':'');
setContact(islocation==='contactt'?'contactt':'')
setLogin(islocation==='loginn'?'loginn':'')
setRegister(islocation==='registerr'?'registerr':'')

}
 useEffect(()=>{
  
const setwidth=()=>{
  if(window.innerWidth<=610)
  {
  setWidth(0);
  }
  else{
    setWidth(50);
  }
}
window.addEventListener('resize',setwidth);
return()=>{
   window.removeEventListener('resize',setwidth);
}
 },[])

 //id={home} onClick={()=>(sethome('homee'))}
 //id={contact}  onClick={()=>(setcontact('contactt'))}
  const Header=()=>{
    return(
    <nav id="nav" >
    <div id="fabars" onClick={()=>(setState(!state))}><FaBars size='25px'/></div>
    <Link to="/" id={home}><HomeIcon/> Home </Link>
    <Link to="/contact" id={contact} ><PhoneIcon/> Contact</Link>
    <Link to="/login" id={login} ><PersonIcon/> Login</Link>
    <Link to="/about" id={register} ><InfoIcon/>About</Link>
</nav>
    );
  } 
  const counter=(x)=>{
setCount(x)
  }
  const resetcounter=()=>{
    setCount(0)
}
  return (
   <>
      <BrowserRouter>
   <Header/>
   <div id="main">
   <div id='showoverlap' style={{width: state ? '170px' :`${width}px`,opacity:state===false && width===0?'0':'1',visibility:state===false && width===0?'hidden':'visible'}} >
   <Slider state={state} setState={setState} count={count} resetcounter={resetcounter}/>
   </div>
   <div id="pages">
   <Router counter={counter} routelocation={routelocation}/>
   </div>
    </div>
    </BrowserRouter>
   </>
  );
}

export default App;
