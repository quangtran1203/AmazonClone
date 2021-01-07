import React from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";

function Header() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuth = () => {
        if (user) {
            auth.signOut();
            alert("You are LOGGED OUT!");
        }
    }; 
    
    const handleOrders = (e) => {
        if (!user) {
            alert("Please SIGN IN to review orders!");
            history.push("/login");
        }
        else {
            history.push("/orders");
        }
    };

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon" />
            </Link>
            
            <div className="header_search">
                <input placeholder="There aren't many items to search. Just scroll down....." className="header_searchInput" type="text"></input>
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"}>
                    <div onClick={handleAuth} className="header_option">
                        <span className="header_optionLineOne">Hello {!user ? "Guest" : user?.email}</span>
                        <span className="header_optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
                
                    <div onClick={handleOrders} className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                
                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>

                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon className="shop_basket" />
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;
