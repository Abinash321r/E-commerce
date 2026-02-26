
import emailQueue from "../queues/emailQueue.js"
import stripePackage from 'stripe';
import { Users,Checkout} from "../models/mongodb.js";
import 'dotenv/config';
const stripe = stripePackage(`${process.env.STRIPE_SECRET_KEY}`);


const getSessionData = async(req, res) => {
     console.log('session_id',req.query.session_id)
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
 const products=req.app.get('products')
  const checkout=products.map((product)=>({
    name:session.customer_details.name,
    email:session.customer_details.email,
    title:product.title,
    quantity:product.quantity
  }))
  console.log('product_details',checkout)
  console.log('customer_details',session.customer_details)
  console.log('emai', session.customer_details.email)
  console.log('status',session.status)
if(session.status!=='open'){
  const task=await Checkout.insertMany(checkout)
  if(!task){
   console.log('data not transfered')
  }
   console.log('data transfered sucessfully')

  const mailOptions = {
    to: session.customer_details.email,
    subject: 'Subject:regarding payment',
    text: `Dear ${session.customer_details.name},\n\nThank you for reaching out to us.\n\n Your order has been received.\n\nMessage:We will get back to you as soon as possible in your address ${session.customer_details.address.line2},${session.customer_details.address.line1},${session.customer_details.address.city}.\n\nBest regards,\nMY REACT FIRST APP`,
  };

  try {
  await emailQueue.add({ mailOptions });
  console.log("Email queued successfully");
  return res.json({
    success: true,
    message: "Order confirmed. Email will be sent shortly.",
  });

} catch (error) {
  console.error("Queue error:", error);
  return res.status(500).json({
    success: false,
    message: "Failed to queue email",
  });
}

}
  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
}

export default getSessionData;