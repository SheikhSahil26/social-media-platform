import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

// import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext.jsx';
import { ProfileContextProvider } from './context/profileContext.jsx';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthContextProvider>
    <ProfileContextProvider>
    <App />
    </ProfileContextProvider>

    </AuthContextProvider>
    </BrowserRouter>
    
  
)
