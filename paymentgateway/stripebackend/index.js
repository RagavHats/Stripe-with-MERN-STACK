const cors = require('cors');
const express = require('express');

const stripe = require('stripe')("sk_test_x2XsZCTWrebsPcFkfTn3xsYc00YLjNsSKI");
const uuid = require("uuid/v4");

const app = express();


//middleware

app.use(express.json());
app.use(cors());

//routes 
app.get("/", (req,res) =>{
    res.send('It works')
})


app.post("/payment" , (req,res)=>{

    const {product , token} = req.body;
    console.log("PRODUCT" , product);
    console.log("Price" , product.price);

    const itempontencykey = uuid();   ///unique id for customer

    return stripe.customers.create({
        email : token.email,
        source : token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount : product.price * 100 ,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email,
            description : `Purchase of product.name`,
            shipping : {
                name : token.card.name,
                address : {
                    country : token.card.address_country
                }
            }
        }, {itempontencykey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

//Listen port

app.listen(5000, () => console.log('listen port at 5000'))
