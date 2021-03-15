import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EmailContext } from './EmailContext';
import { auth } from './firebase';
import './style/Auth.css';

function Auth() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameEmail, setNameEmail] = useContext(EmailContext)

    const newEmail =  e => {
        setEmail(e.target.value)
        setNameEmail("imad")
    }

     // the login set up
     const singIn = e => {
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/home')
        })
        .catch(error => alert(error.message))
    }

    var logo = require('./img/logo.png').default
    return (
        <div className="auth">
            <div className="left__side">
                <div className="auth__logo">
                    <img className="img__logo" src={logo} />
                </div>
            </div>
            <div className="right__side">
                <div className="login__container">
                    <h3>Log In</h3>
                    <label htmlFor="">User</label>
                    <input type="text"
                    onChange={newEmail}
                    placeholder="Email"/>
                    <label htmlFor="">Password</label>
                    <input type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"/>
                    <button className="login__btn"
                    onClick={singIn}>
                        login
                    </button>
                    <h5>You don't have account? <Link to="/signup">sign up</Link></h5>
                </div>
            </div>
        </div>
    )
}

export default Auth
