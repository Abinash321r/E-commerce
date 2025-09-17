import React from 'react'
import { useEffect,useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
function CheckoutForm() {
    const stripePromise = loadStripe("pk_test_51OGManSAcZtFdwtvJftGWEQh1T4vKyK5LkroTWhRYwqAPXxT5Bu18ruw3WZIqQSP9e86TjBeeRHDmMaZClTMW78C001BoYGHf0");
    const [clientSecret, setClientSecret] = useState('');

    const {state}=useLocation()
    console.log(state)
   // const [check,setCheck]=useState(state)
  // const check=state;
   useEffect(()=>{
    if(state===null ||state===undefined)
    {console.log('undefined or null caught')}
    else
    {
        const cart=state.quantity;
        console.log(cart)
        axios.post('http://localhost:5000/create-checkout-session',cart,{withCredentials:true}).then(res=>{
            setClientSecret(res.data.clientSecret);
        console.log(res.data.clientSecret)
       }).catch(error=>
      console.log('error'))
    }
},[])
  return (<>
  {(state==null||state==undefined)?<div id='pagenotfound'>page not found</div>:
  <div id='checkout'>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
     </div>
  }
    </>
  )
}

export default CheckoutForm;