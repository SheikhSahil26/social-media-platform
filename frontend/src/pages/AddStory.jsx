import React from 'react'
import './addpost.css'
import { useState } from 'react'
import useAddStory from '../hooks/useAddStory'


const AddStory = () => {

    const [inputs,setInputs]=useState({
        storyContentUrl:{},
    })
    const [loading,setLoading]=useState(false)
    

    const {addStory}=useAddStory();
    
    console.log(inputs)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        await addStory(inputs);
        setLoading(false);
    }
    
    

  return (
    <div>
       <div className="post-creator">
        <div className="post-header">
            <h1>Create New Story</h1>
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="post-content">
            <div className="upload-area">
                <div className="upload-icon">📸</div>
                <p className="upload-text">Drag and drop your photos or videos here</p>
                <input type="file" id="file-upload" name="storyContentUrl" hidden accept="image/*"
                onChange={(e)=>setInputs({...inputs,storyContentUrl:e.target.files[0]})}></input>
                <label htmlFor="file-upload" className="upload-button">Choose from device</label>
            </div>

           
        </div>

        <div className="post-footer">
            <button type="submit" className="share-button"  disabled={loading}>{loading?"uploading...":"upload"}</button>
        </div>
        </form>
    </div>
    </div>
  )
}

export default AddStory
