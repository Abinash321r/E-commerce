import React from 'react'
import '../Searchbar.css';
//import products from'../Products.json'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
   
    const inputRef=useRef();
    const navigate=useNavigate()
    const [data,setData]=useState([]);
    const [filter,setFilter]=useState([]);
    const [searchitem,setSearchItem]=useState('');
    const [count,setCount]=useState(0)
 const [products,setProducts]=useState('');


    const handleKeyDown=(event)=>{
        console.log(event.target.value)
            if(event.key==='ArrowDown'&& filter.length!==0){
             console.log('i am count down',count)
             setSearchItem(filter[count])
             setCount(count+1)
            }
            else if(event.key==='ArrowUp' &&filter.length!==0){
                event.preventDefault();
                if(count>=2){
                console.log('i am count up',count-2)
                setSearchItem(filter[count-2])
                setCount(count-1)
               
                }
                else{
            setCount(0)
                }
            }
            else if(event.key==='Enter' &&filter.length!==0){
                const filteritems=products.filter((product)=>{
                    return product.title.toLowerCase().includes(event.target.value.toLowerCase())
          
                 })
                 navigate('/Product',{state:{filteritems}})
            }
            else{
             setSearchItem(event.target.value)
             setCount(0)
                }
        }
  
    const Test=(event)=>{
        const value=event.target.value
        setSearchItem(event.target.value)
        console.log(value)
        const filter=products.filter((product)=>{
           return product.title.toLowerCase().includes(value.toLowerCase())
 
        })
        
        const filtertitle=filter.map((items)=>items.title);
        console.log(filtertitle)
        setFilter(filtertitle)

        if(value==="")
        setData([])
        else
        setData(filter)
    }
    const Clear=()=>{
        setData([])
        setSearchItem('')
    }

    useEffect(()=>{
    
        fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        console.log(data)});},[])
 
  return (
    <>
    <div id="searchbar">
        <input type='text' placeholder='Search'  ref={inputRef} onChange={Test}  value={searchitem} onKeyDown={(event)=>{handleKeyDown(event)}}/>
        {searchitem.length===0?<SearchIcon/>:<ClearIcon id='clear' onClick={Clear}/>}
    </div>
    {
    data.length!==0 &&(
    <div id="searchitems">
        {
            data.map((title,index)=>{
                console.log('count from map',count)
                const Handler=(filteritems)=>{
                    navigate('/Product',{state:{filteritems}})
                }
                return(
                    <div key={index} onClick={()=>Handler(title)}  style={{backgroundColor:count===index+1?'white':''}}>{title.title}</div>
                )
            })
        }
    </div>)
}
    </>
  )
}

export default Searchbar