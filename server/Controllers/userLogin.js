import jwt from "jsonwebtoken";
import { Users,Checkout} from "../models/mongodb.js";
import 'dotenv/config';

const getLoginData = async(req, res) => {
     // res.end(' data from server')
   console.log(req.body)
   const userdata={
    name:req.body.name,
    password:req.body.password,
    phone:req.body.phone
   }
   const user=await Users.findOne({name:userdata.name,password:userdata.password,phone:userdata.phone})
   if(user){
    const usertoken=jwt.sign({_id:user._id},`${process.env.JWT_TOKEN}`)
    res.cookie("usertoken",usertoken, {
      httpOnly: true,
      sameSite: "none",
      secure: true, // set true in production
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.send('user exist')
   }
   else{
   const task=await Users.insertMany([userdata])
   if(!task){
    console.log('data not transfered')
   }
    console.log('data transfered sucessfully')
    console.log(task[0]._id)
   // const data={
   //     isAuthenticated:true
   // }
  const usertoken=jwt.sign({_id:task[0]._id},`${process.env.JWT_TOKEN}`)
   console.log(usertoken)
    res.cookie("usertoken", usertoken, {
        httpOnly: true,
      sameSite: "none",
      secure: true, // set true in production
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
   // res.json(data)
   res.send('user logged in sucessfully')
}
}

export default getLoginData;