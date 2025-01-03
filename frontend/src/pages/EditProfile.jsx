import React, { useState } from 'react'
import "./editprofile.css"
import { useNavigate } from 'react-router-dom'
import useEditProfile from '../hooks/useEditProfile'

const EditProfile = () => {

    const navigate=useNavigate()

    const [inputs,setInputs]=useState({
        username:"",
        bio:"",
        profilePicUrl:{},
    })

    const {editProfile}=useEditProfile();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await editProfile(inputs);
    }


  return (       
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
       <div className="container">
    <div className="profile-card">
        <h1>Edit Profile</h1>
        
        <div className="profile-photo-section">
            <div className="profile-photo-container">
                <img src="https://via.placeholder.com/150" alt="Profile Photo" className="profile-photo"/>
                
                
                    
                
            </div>
            <div className="photo-text">
                <h3>Profile Photo</h3>
                <p>Upload a new profile photo</p>
            </div>
        </div>

        <form className="edit-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" onChange={(e)=>setInputs({...inputs,profilePicUrl:e.target.files[0]})}></input>
            <div className="form-group">
                <label htmlFor="fullName">username</label>
                <input type="text" id="fullName" name="username" placeholder="John Doe"
                value={inputs.username}
                onChange={(e)=>setInputs({...inputs,username:e.target.value})}
                />
            </div>


            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" rows="4" 
                value={inputs.bio}
                onChange={(e)=>setInputs({...inputs,bio:e.target.value})}></textarea>
            </div>

            <div className="button-group">
                <button type="button" className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-save">Save Changes</button>
            </div>
        </form>
    </div>
</div>
    </div>
  )
}

export default EditProfile
