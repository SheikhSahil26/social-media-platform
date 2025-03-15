import React, { useState } from 'react'
import './login.css'
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'

const Login = () => {

  const {login}=useLogin()//hook function custom

  const [inputs,setInputs]=useState({
    username:"",
    password:""
  })
  console.log(inputs)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await login(inputs);
  }

  return (
    <div className="login-container">
    <div className="login-content">
      <div className="left-panel">
        <div className="brand">
          <h1>Welcome Back</h1>
          <p className="tagline">Your global community awaits you</p>
        </div>
        <div className="features">
          <div className="feature-item">🚀 Resume your journey</div>
          <div className="feature-item">💫 Discover what's new today</div>
          <div className="feature-item">🤝 Reconnect with your network</div>
        </div>
      </div>
      
      <div className="right-panel">
        <div className="login-box">
          <h2>Sign in to Connect</h2>
          <div className="social-buttons">
            <button className="social-btn google">
              <img src="/api/placeholder/20/20" alt="Google" />
              Continue with Google
            </button>
            <button className="social-btn apple">
              <img src="/api/placeholder/20/20" alt="Apple" />
              Continue with Apple
            </button>
          </div>
          
          <div className="divider">
            <span>or</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="username"
                value={inputs.username}
                onChange={(e)=>setInputs({...inputs,username:e.target.value})}//this is used to create dynamic input field like jo bhi hum likhenge vo onthe spot input mai jayega .....
              />
            </div>

            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password"
                value={inputs.password}
                onChange={(e)=>setInputs({...inputs,password:e.target.value})}
              />
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Sign in
            </button>
          </form>

          <div className="signup-link">
            New to Connect? <Link to={'/signup'}>create new Account</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
