import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.DATABASE_URL,{ family: 4 }).then(()=>
console.log('database connected sucessfully')).catch((error)=>
console.log('error'))

const users=mongoose.Schema({
    name:String,
    password:String,
    phone:Number,
    isAuthenticated:{
        type:Boolean,
        default:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})
const checkout=mongoose.Schema({
    name:String,
    phone:Number,
    title:String,
    quantity:Number
})
//export const Users=mongoose.model("users",users);
const Users=mongoose.model("users",users);
const Checkout=mongoose.model("checkout",checkout);
export{ Users, Checkout,};