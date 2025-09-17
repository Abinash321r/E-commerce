
import stripePackage from 'stripe';
import 'dotenv/config';
const stripe = stripePackage(`${process.env.STRIPE_SECRET_KEY}`);


const getCheckOutSessionData = async(req, res) => {
    // console.log(req.data)
  console.log(req.body)
  const products=req.body
  req.app.set('products',products)
 const lineItems=products.map((product)=>({
  price_data:{
    currency:'usd',
    product_data:{
      name:product.title,
    },
    unit_amount:product.price*100,
  },
  quantity:product.quantity,
 }))
 console.log(lineItems)

 const session = await stripe.checkout.sessions.create({
  ui_mode: 'embedded',
  line_items:lineItems,
  mode: 'payment',
  return_url: `${process.env.CLIENT_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
});

res.send({clientSecret: session.client_secret});
}

export default getCheckOutSessionData;