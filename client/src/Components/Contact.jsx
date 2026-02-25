import React from 'react'
import '../Contact.css';
import { useEffect,useState} from 'react';
import axios from 'axios';
function Contact({routelocation}) {
const [contact,setContact]=useState({
  name:'',
  email:'',
  subject:'',
  message:''
})
const [validname,setValidName]=useState(true)
  const [validemail,setValidEmail]=useState(true)
  const [validsubject,setValidSubject]=useState(true)
  const [validmessage,setValidMessage]=useState(true)

  const usernameRegex = /^[a-zA-Z]{2,}$/;
  const subjectRegex = /^[\w\d\s\S]{5,}$/;
  const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const messageRegex = /^[\w\d\s\S]{10,}$/;
  const handlesubmit=(event)=>{
    event.preventDefault();
    if((contact.name=='')|| (contact.name.length<3)||(usernameRegex.test(contact.name)==false)){
      setValidName(false)
      setContact({...contact,name:''})
      console.log('user name invalid',contact.name.length,contact.name)
      return;
    }
    if((contact.email=='')||(contact.email.length<4)||(emailRegex.test(contact.email)==false)){
      setValidEmail(false)
      setContact({...contact,email:''})
      console.log('user email invalid',contact.email.length,emailRegex.test(contact.email))
      return;
    }
    if((contact.subject=='')|| (contact.subject.length<10)||(subjectRegex.test(contact.subject)==false)){
      setValidSubject(false)
      setContact({...contact,subject:''})
      console.log('user subject invalid')
      return;
    }
    if((contact.message=='')|| (contact.message.length<10)||(messageRegex.test(contact.message)==false)){
      setValidMessage(false)
      setContact({...contact,message:''})
      console.log('user message invalid')
      return;
    }
    else{
      axios.post(`${process.env.REACT_APP_SERVER_URL}/sendmail`,contact,{withCredentials:true}).then(res=>{
        console.log('data transfered')
        console.log(res.data)
        window.alert('sucessfully email sent')
        setValidName(true)
      setValidEmail(true)
      setValidSubject(true)
      setValidMessage(true)
      setContact({...contact,name:'',email:'',subject:'',message:''})
      }).catch(error=>{
        console.log('error')
      })
      
    }
  }
  const handleonchange=(e)=>{
setContact({...contact,[e.target.name]:e.target.value})
  } 
  useEffect(()=>{
console.log(' route mounted')
routelocation('contactt')
return()=>{
console.log(' route changed')
routelocation('')
};
  },[])
  console.log(contact)
  return (
    <div className='contact'> 
        <form  className="contactform">
          <div>
          <label >Name:</label>
          <input  id={validname?"name":"invalid"} type="text" name='name' value={contact.name} onChange={(e)=>{handleonchange(e)}} placeholder={validname?'Enter your name':'Invalid name'} autoComplete='off'/>
          </div>
          <div>
          <label >Email:</label>
          <input id={validemail?"email":"invalid"} type="email" name='email' value={contact.email} onChange={(e)=>{handleonchange(e)}} placeholder={validemail?'Enter your email':'Invalid email'}autoComplete='off' /> 
          </div>
          <div>
          <label >Subject:</label>
          <input  id={validsubject?"subject":"invalid"} type="text" name='subject' value={contact.subject} onChange={(e)=>{handleonchange(e)}} placeholder={validsubject?'Enter your subject':'Invalid subject'} autoComplete='off'/>
          </div>
          <div>  
          <label >Message:</label>
          <textarea id={validmessage?"message":"invalid"} name="message" value={contact.message} onChange={(e)=>{handleonchange(e)}} placeholder={validmessage?'Enter your message':'Invalid message'} autoComplete='off' ></textarea>
          </div>
          <div>
          <button id='submitbutton' onClick={handlesubmit}>submit</button>
          </div>
        </form>
    </div>
    
    //</div>
  )
}

export default Contact
//