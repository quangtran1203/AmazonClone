import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from "./firebase";
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders';

const promise = loadStripe("pk_test_51I5IXQFbLftxrNpuHpXJgnQhi6QIYbeL4Uof7v7JCauZg6OSEMoyuUxCzvlayxnCWG8sr2de2OV4WIHNKXKLXIjv00XbwkgmYZ");

function App() {
  const [{ }, dispatch] = useStateValue();

  //will only run once when the app component
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>", authUser);
      if (authUser) {    // if an user is logged in -> set type and user to the user
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      }
      else {    // if the user is logged out, set user to null
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        
        <Switch>
          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        <Route path="/checkout">
            <Header/>
            <Checkout />
          </Route>
          <Route path="/">
            <Header/>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
