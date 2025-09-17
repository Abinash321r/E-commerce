
import axios from 'axios';
import { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom';
function Return() {
const [status, setStatus] = useState(null);
 const [customerEmail, setCustomerEmail] = useState('');
 useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
console.log(sessionId);
   fetch(`http://localhost:5000/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        console.log(data.status)
        console.log(data.customer_email)
      });
  }, []);
  return (
    <div>{status==='open'?<Navigate to="/checkout" />:
    <section id="success">
    <p style={{color:'black'}}>
      We appreciate your business! A confirmation email will be sent to {customerEmail}.

      If you have any questions, please email <a href="mailto:developernepali287@gmail.com">developernepali287@gmail.com</a>
    </p>
  </section>
        
        }</div>
  )
}

export default Return