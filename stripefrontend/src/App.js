import React from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';

function App() {
  const [product, setProduct] = useState({
    name: 'React from Facebook',
    price: 10,
    productBy: 'Facebook',
  });

  const makePayment = token =>{
    const body = {
      token,
      product,
    }
    const headers = {
      "Conten-Type" : "application/json"
    }
    return fetch(`http://localhost:8282/payment`, {
      method:"POST",
      headers,
      body:JSON.stringify(body),
    }).then(response=>{
      console.log("RESPONSE", response);
      const {status} = response;
      console.log("STATUS", status);
    })
    .catch(error => console.log(error))
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
          stripeKey="pk_test_51OI821SE7gwhlngUTBlWJaF7h0tURkNGMFIBWz4VHNyNoArkR4vD5UCqbQ0ZYEMEeFn3lsa6kMkKveIQDcX21AFW00SMSgtDsq"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large red">
            Buy React for ${product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
