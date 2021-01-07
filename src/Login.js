import React, {useState} from 'react';
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(auth => {
            history.push("/")
        }).catch(error => alert(error.message))
    };

    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            console.log(auth);
            if (auth) {
                history.push("/")
            }
        }).catch(error => alert(error.message))
    };

    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG27.png" />
            </Link>

            <div className="login_container">
                <p className="note">Click on the logo to go back to the Homepage</p>
                <h1>Sign-In</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>

                    <button type="submit" className="login_signinbutton" onClick={signIn}>Sign In</button>
                </form>
                <p className="consent">For new users, enter your credentials into the input boxes above and hit the "Create one here" button below.</p>

                <button onClick={register} className="login_create">Don't have an account? Create one here</button>
            </div>
        </div>
    )
}

export default Login
