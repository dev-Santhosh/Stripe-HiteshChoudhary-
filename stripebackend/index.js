const cors = require ("cors");
const express = require ("express");
// Add a stripe key
const stripe = require ("stripe")("sk_test_51OI821SE7gwhlngUa4R8yKPLIuVWVHSzMUb5AaPiL2NdWMeOyI2Ya39h28wu6mXjsuXH9X83A0g0CLbCnqZEBjI400k216m2aA");
const { v4: uuidv4 } = require("uuid"); // Import v4 function from uuid package
const app = express();


// Middlewear
app.use(express.json());
app.use(cors());

// routes
app.get("/",(req,res)=>{
    res.send("It is working");
})
app.get("/payment",(req,res)=>{
    const {product, price} = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email:token.email,
        source:  token.id,
    })
    .then(customer =>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            recepit_email: token.email,
            description:`Purchase of ${product.name}`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country,
                }
            }
        },{idempotencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
})

// listen
app.listen(8282, ()=>{console.log("LISTENING AT PORT-8282");})