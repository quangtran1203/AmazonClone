import React from 'react';
import "./CheckoutItem.css";
import { useStateValue } from './StateProvider';

function CheckoutItem({ id, title, price, rating, image, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    };

    return (
        <div className="checkoutitem">
            <img className="checkoutItem_image" src={image} />
            <div className="checkoutItem_info">
                <p className="checkoutItem_title">{title}</p>
                <p className="checkoutItem_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutItem_rating">
                    {Array(rating).fill().map((_, i) => (<p>⭐</p>))}
                </div>
                {!hideButton && (<button onClick={removeFromBasket}>Remove From Basket</button>)}
            </div>
        </div>
    )
}

export default CheckoutItem
