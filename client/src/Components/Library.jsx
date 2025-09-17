import React from 'react'
//import products from '../Products.json'
import '../Library.css'
import Image from './Image'
import { useState ,useEffect} from 'react'
function Library() {
  const imageArray=products.map((product)=>product.image)
  const [index,setIndex]=useState();
  const [products,setProducts]=useState('');


  console.log(imageArray)
const next =(value)=>{
  if(value=='left'){
    if(index>=1){
    setIndex(index-1)
    }
  }
  else{
    setIndex(index+1)
  }
}
  const reset =()=>{
    setIndex();
  }
  const handleclick=(index)=>{
console.log(index)
setIndex(index)
  }
  console.log('index:',index)



  
    useEffect(()=>{
  
      fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data)
      console.log(data)});
    },[])

  return (
    <>
   {index===undefined?
   <div id='imagearraycontainer'>
   {
    imageArray.map((image,index)=>{
      return(
        <div className="imagearray" key={index} onClick={()=>{handleclick(index)}}>
          <img src={image}></img>
        </div>
      )
    })
   }
   </div>:
   <Image imageArray={imageArray} index={index} setIndex={setIndex} reset={reset} next={next}/>
   }
   </>
  )
}

export default Library