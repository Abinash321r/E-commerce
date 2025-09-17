import React from 'react'
import '../Image.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect,useState,useRef} from 'react';
import {useInView} from 'react-intersection-observer'
function Image({imageArray,index,reset,next,setIndex}) {
  const imgRef=useRef();
const [mobileview,setMobileView]=useState(false);

  useEffect(()=>{
    if(window.innerWidth<=500){
      setMobileView(true)
    }
    const handleresize=()=>{
      console.log('eventlistnercalled')
if(window.innerWidth<=500){
  setMobileView(true)
}
else{
  setMobileView(false)
}
    }
window.addEventListener('resize',handleresize);

return ()=>{
  window.removeEventListener('resize',handleresize);
}

  },[])
useEffect(()=>{
  console.log('rendered')
  if(imgRef.current){
    const container=imgRef.current;
    container.scrollLeft=container.clientWidth*index+35*index;
  }
},[mobileview])
 
  console.log('mobileview',mobileview)
  return (
    <div id='fullwidthimage'>
        <div className='left'  style={{opacity:mobileview?'0':'1'}}onClick={()=>{next('left')}}><ArrowBackIosNewIcon/></div>
        <div className="containerofimage" ref={imgRef}>
          {mobileview?<div id='mobilecontainerofimage'  ref={imgRef} >
          {imageArray.map((image,index)=>{
              return(
                <img src={image} key={index}></img>
              )
            })
          
        }
        </div>
       : <img src={imageArray[index]}></img>
          }
        </div>
        <div className='right' style={{opacity:mobileview?'0':'1'}} onClick={()=>{next('right')}}><ArrowForwardIosIcon/></div>
        <div id='close' onClick={()=>{reset(null)}}><ClearIcon/></div>
    </div>
  )
}

export default Image