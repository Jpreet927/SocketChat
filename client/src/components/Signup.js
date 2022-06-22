import React, { useState } from 'react'
import '../styles/Signup.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'  

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, password };
        console.log(data);

        // if (!name || !email || !password || !confirmPassword) {
        //     return
        // }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user",
                {name, email, password},
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            history.push("/dashboard");
            
        } catch (err) {
            console.log(err.message);
        }

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return(
        <div className='signup'>
            <div className="signup-modal">
                <div className="signup-header">
                <h1>Sign Up</h1>
                <p>Create a new account to start chatting!</p>
                </div>
                <form id='signup-form' action="" onSubmit={ handleSubmit }>
                    <label htmlFor="">Your Name</label>
                    <input 
                        name="name"
                        type="text" 
                        placeholder="Lord Cornelius Cummer" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <label htmlFor="">Your email</label>
                    <input 
                        name="email"
                        type="text" 
                        placeholder="example@gmail.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label htmlFor="">Your password</label>
                    <input 
                        name="password"
                        type="password" 
                        placeholder="********" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <label htmlFor="">Confirm password</label>
                    <input 
                        name="confirmPassword"
                        type="password" 
                        placeholder="********" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}  
                        required 
                    />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}


export default Signup