import React,{useState} from 'react'
import './signup.css'
import { Link } from 'react-router-dom'
import useSignUp from '../hooks/useSignUp'

const Signup = () => {

    const [inputs,setInputs]=useState({
        username:"",
        password:"",
    })
    
    const {signup} = useSignUp()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signup(inputs);
    }




  return (
    <div className="signup-container">
    <div className="signup-content">
      <div className="left-panel">
        <div className="brand">
          <h1>Connect</h1>
          <p className="tagline">Join millions of people sharing ideas worldwide</p>
        </div>
        <div className="features">
          <div className="feature-item">✨ Share your thoughts instantly</div>
          <div className="feature-item">🌍 Connect with global community</div>
          <div className="feature-item">🎯 Discover trending topics</div>
        </div>
      </div>
      
      <div className="right-panel">
        <div className="signup-box">
          <h2>Create your account</h2>
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

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
              type="text" 
              placeholder="username"
                value={inputs.username}
                onChange={(e)=>{setInputs({...inputs,username:e.target.value})}} />
            </div>

            <div className="form-group">
              <input 
              type="password" 
              placeholder="Password" 
              value={inputs.password}
              onChange={(e)=> setInputs({...inputs,password:e.target.value})}/>
              <span className="password-hint">Must be at least 8 characters</span>
            </div>

            <button 
                type="submit" 
                className="signup-button"

            >
              Create account
            </button>
          </form>

          <p className="terms">
            By signing up, you agree to our <a href="#">Terms</a>, 
            <a href="#">Privacy Policy</a>, and <a href="#">Cookie Use</a>.
          </p>

          <div className="login-link">
            Already have an account? <Link to={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup
