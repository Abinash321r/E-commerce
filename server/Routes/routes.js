
import express from 'express';
import getLoginData from '../Controllers/userLogin.js';
import getMailData from '../Controllers/userMail.js';
import getSessionData from '../Controllers/userSession.js';
import getCheckOutSessionData from '../Controllers/userCheckOutSession.js';
import { isAuthenticated } from '../Middlewares/Authentication.js';
import { Users, Checkout } from '../models/mongodb.js';


const router = express.Router();
router.post('/data',getLoginData);
router.post('/sendmail',getMailData);
router.get('/session-status',getSessionData);
router.post('/create-checkout-session',getCheckOutSessionData);



router.get('/',(req,res)=>{
   console.log(req.cookies.usertoken)
  res.end('<h1>hello from server</h1>')
})


router.get('/api',isAuthenticated,(req,res)=>{
 console.log(req.data)
 res.json(req.data)
})

router.get('/logout',(req,res)=>{
   res.clearCookie("usertoken")
    const data={
       isAuthenticated:false
    }
    console.log(data.isAuthenticated)
   // console.log(req.cookies.usertoken)
   res.json(data)
})

router.get('/dashboard',async(req,res)=>{
  //const data=await Checkout.find({}).exec();
  const data=await Checkout.find();
  console.log(data)
  res.json(data)
})

export default router;