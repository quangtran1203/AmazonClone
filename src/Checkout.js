import React from 'react';
import "./Checkout.css";
import CheckoutItem from './CheckoutItem';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/gc/2020/UK_ASV_Unrec_1._CB416224957_.png" alt="" />
                <div>
                    <h3 className="greet">Hey {user?.email  /*Use optional chaining*/}</h3>
                    <h2 className="checkout_title">Your Shopping Basket</h2>
                    
                    {basket.map(item => (
                        <CheckoutItem id={item.id} title={item.title} price={item.price} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>
            <div className="checkout_right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
