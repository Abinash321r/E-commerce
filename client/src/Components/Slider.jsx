import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import InfoIcon from '@mui/icons-material/Info';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import { NavLink } from 'react-router-dom';
import { useEffect ,useRef} from 'react';
import '../App.css';
function Slider({count,state,setState,resetcounter}) {
    const ref=useRef();
    console.log(count) 
    /*{
        path:"/about",
        icon:<InfoIcon/>,
        item:"About"
    },*/
    const menuItem=[
        {
            path:"/dashboard",
            icon:<GridViewIcon/>,
            item:"Dashboard"
        },
        {
            path:"/library",
            icon:<PhotoLibraryIcon />,
            item:"Library"
        },
        {
            path:"/comment",
            icon:<ChatIcon/>,
            item:"Comment"
        },
        {
            path:"/history",
            icon:<HistoryIcon />,
            superscript:count,
            item:"History"
        },
    ]
    useEffect(()=>{
        const handlemousedown =(event)=>{
          if(!ref.current.contains(event.target)) {
           setState(false)
          } 
        }
        document.addEventListener('mousedown',handlemousedown)
        return ()=>{
            document.removeEventListener('mousedown',handlemousedown)
        }
    },[])
  return (
    <div className='slider' ref={ref}>
        {menuItem.map((item,index)=>{
            if(item.superscript===undefined){
                console.log('undefined caught')
            }
            return(
         <NavLink to={item.path} key={index}>
            <div id="row"  onClick={resetcounter}>
           
            <div id="icon">{item.icon}{item.superscript!==undefined && item.superscript!==0?(<div id='superscript'>{item.superscript}</div>):null}</div>
           
            <div  id="item" style={{display:state?"block":"none"}}> {item.item}</div>
            <span id='tooltip' style={{display:state?'none':''}}>{item.item}</span>
            </div>
            </NavLink>)
        })
        
        }
    
    </div>
  )
}
//{count!==0 && item.item==='History'?<div id='superscript'>{count}</div>:null}
export default Slider