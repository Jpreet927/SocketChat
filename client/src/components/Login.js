import React, { useState } from 'react'
import '../styles/Login.css'
import axios from 'axios'
import { useHistory } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login", { email, password }, config);
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/dashboard");
    } catch (err) {
      console.log(err.message);
    }

    // setEmail('');
    // setPassword('');
  }

  return (
    <div className='login'>
      <div className="login-modal">
        <div className="login-header">
          <h1>Log In</h1>
          <p>Log in to access your account</p>
        </div>
        <form id='login-form' action="" onSubmit={ handleSubmit }>
          <label htmlFor="">Your email</label>
          <input 
            type="text" 
            placeholder="example@gmail.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required />
          <label htmlFor="">Your password</label>
          <input 
            type="password" 
            placeholder="********" 
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  />
          <button>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login