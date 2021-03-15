import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, db } from './firebase'
import './style/Auth.css'

function Auth() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


       // the register set up
       const register = e => {
        e.preventDefault()
        db.collection("users").add({
            email : email
        })
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            if (auth) {
                history.push('/login')
            }
        })
        .catch(error => console.log(error))
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
                    <h3>Sign Up</h3>
                    <label htmlFor="">User</label>
                    <input type="text"
                    onChange={ e => setEmail(e.target.value)}
                    placeholder="Email"/>
                    <label htmlFor="">Password</label>
                    <input type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"/>
                    <button className="login__btn"
                    onClick={register}>
                        Sign Up
                    </button>
                    <h5>You do have an account? <Link to="/login">log in</Link></h5>
                </div>
            </div>
        </div>
    )
}

export default Auth
