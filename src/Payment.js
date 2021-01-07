import React, {useEffect, useState} from 'react';
import CheckoutItem from './CheckoutItem';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate a stripe secret which allows us to charge the customers
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in currencies subunits (cents)
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket]);   //whenever the basket changes, this will make a request to Stripe to change the total amount

    console.log("The secret is >>>", clientSecret);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation
            db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: "EMPTY_BASKET",
            })

            history.replace("/orders");
        })
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>CHECKOUT (<Link to="/checkout"> {basket?.length} items </Link>)</h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>999 Random Street</p>
                        <p>SomeProvince, SomeCountry X9X 9X9</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                        <div className="recalc">
                        <CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} decimalScale={2} thousandSeparator={true}
                prefix={'$'} renderText={(value) => (
                    <>
                        <p>Subtotal ({basket.length} items): <strong>{value}</strong></p>
                    </>
                )} />
                        </div>
                    </div>
                    <div className="payment_items">
                        {basket.map(item => (
                            <CheckoutItem id={item.id} title={item.title} price={item.price} image={item.image} rating={item.rating}/>
                        ))}
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                        <div className="importantnotes">
                            <small>Please use the sequence of 4242424242... for testing purposes</small>
                            <small>(starting from the card number input box, keep pressing 4 and 2 and 4 and 2 until all fields are filled out, then click BUY NOW).</small>
                        </div>
                    </div>
                    <div className="payment_details">
                        {/*Stripe Implementation*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                                <CurrencyFormat renderText={value => (
                                    <h4>Order Total: {value}</h4>
                                )} decimalScale={2} value={getBasketTotal(basket)} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                
                                <button className="buybutton" disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
