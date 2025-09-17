import React from 'react'
import '../LoadingSkeleton.css'
function LoadingSkeleton() {
    const array=Array(20).fill(1);
  return (
    <div className='elementcontainerskeleton'>
    {
      array.map((arrayelements,index)=>{
        return(
          
          <div id="elementskeleton" key={index}>
            <div id="imageskeleton">
          <img id='imgskeleton'></img>
          </div>
          <div id="descriptionskeleton">
          <div id='titleskeleton'></div>
          <div id='textskeleton'>
            <div id="text"></div>
            <div id="text"></div>
            <div id="text"></div>
            <div id="text"></div>
            <div id="text"></div>
            <div id="text"></div>
          </div>
          <div id='priceskeleton'></div>
          <button id="cartskeleton"></button>
          </div>
         </div>
         
        )

      })
    }
    </div>
  )
}

export default LoadingSkeleton