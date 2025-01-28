import { useState } from 'react'
import {BrowserRouter,Routes,Route,Router,Navigate} from 'react-router-dom';
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage.jsx'
import Signup from './pages/signup.jsx';
import toast, { Toaster } from 'react-hot-toast'; 
import { useAuthContext } from './context/authContext.jsx'
import EditProfile from './pages/editProfile.jsx';
import Profile from './pages/Profile.jsx';
import AddPost from './pages/AddPost.jsx';
import SeeComments from './pages/SeeComments.jsx';

import './App.css'
import AddStory from './pages/AddStory.jsx';

function App() {
  const [count, setCount] = useState(0)
  const {authUser}=useAuthContext();

  

  return (
    <>
     
      <Routes>
      <Route path="/" element={authUser?<HomePage/>:<Navigate to='/login' />}/>
      <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup/>}/>
      <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login/>}/>
      <Route path="/profile/:username" element={authUser?<Profile/>:<Navigate to='/login'/>}/>
      <Route path="/editprofile" element={authUser?<EditProfile/>:<Navigate to='/login' />}/>
      <Route path="/addpost" element={authUser?<AddPost/>:<Navigate to="/login"/>}></Route>
      <Route path="/addstory" element={authUser?<AddStory/>:<Navigate to="/login"/>}></Route>
      <Route path='/seecomments/:postId' element={authUser?<SeeComments/>:<Navigate to="/login"/>}></Route>
      </Routes>
      
      <Toaster/>

    </>
  )
}

export default App
