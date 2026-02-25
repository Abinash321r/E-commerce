import React from 'react'
import '../Dashboard.css'
import {useState,useEffect} from 'react'
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar,Line } from 'react-chartjs-2';
import { fromPairs } from 'lodash';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const[title,setTitle]=useState([]);
  const[quantity,setQuantity]=useState([]);
  
  const data={
    labels:title,
    datasets:[
      {
      label:'bar chart-1',
      data:quantity,
      backgroundColor:["green","blue","yellow","orange"],
    },
  ]
  }
  const options1={
    responsive:true,
    plugins:{
      legend:{
        position:'top',
      },
    title:{
      display:true,
      text:'bar-cart',
    }
  }
  }
const options2={
  responsive:true,
  plugins:{
  title:{
    display:true,
    text:'Line-cart'
  }
}
}
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_SERVER_URL}/dashboard`,{withCredentials:true}).then(res=>{
    console.log(res.data)
    const data=res.data;
    const label=data.map((title)=>title.title)
    console.log(label)
   const value=data.map((quantity)=>quantity.quantity)
    console.log(value)
    setTitle(label)
    setQuantity(value)
 }).catch(error=>
   console.log('error'))
},[])
  return (
    <div id='chart'>
      <div>
        <Bar data={data} options={options1} />
      </div>
      <div>
        <Line data={data} options={options2}/>
      </div>
    </div>
  )
  }
export default Dashboard