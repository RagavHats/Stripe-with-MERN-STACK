import React , {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

require('dotenv').config()

function App() {
  
  const [product , setProduct] = useState({
    name : "React From facebood",
    price : 10,
    productBy : "facebook",

  })

const makePayment = token => {
  const body ={
    token , product
  }
  const headers ={
    "Content-Type" : "application/json"
  }

  return fetch('http://localhost:5000/payment/', {method : 'POST' ,  headers , body : JSON.stringify(body)})
  .then(response => {
     console.log("Response" , response)
  }).catch(err => {
    console.log(err)
  })

}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        token={makePayment}
        stripeKey="pk_test_mfYxya5aAN4WQo9PZKjWSeTp008MSZuaCm"
        name="Buy React"
        amount = {product.price * 100}
        shippingAddress
  billingAddress
      >
        <button className ="btn-large pink">Buy Now for {product.price} $</button>

      </StripeCheckout>
     </header>
    </div>
  );
}

export default App;
