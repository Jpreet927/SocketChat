import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Home.css'
import Login from './Login'
import Signup from './Signup'

function Home() {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);

    const toggle = () => {
        setShowLogin(visible => !visible);
        setShowSignup(visible => !visible);
    };

    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) {
            history.push("/dashboard");
        }
    }, [history])


  return (
    <div className='Home'>
        {showLogin && (
            <div className="login-form">
                <Login />
                <div className="signup-prompt">
                    <p>Don't have an account?</p>
                    <p id='sign-up-btn' onClick={toggle}>Sign Up!</p>
                </div>
            </div>
        )}

        {showSignup && (
            <div className="signup-form">
                <Signup />
                <div className="login-prompt">
                    <p>Already have an account?</p>
                    <p id='login-btn' onClick={toggle}>Login!</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default Home