import React from 'react'
import './addpost.css'
import { useState } from 'react'
import useAddPost from '../hooks/useAddPost'

const AddPost = () => {

    const [inputs,setInputs]=useState({
        postImageUrl:{},
        postCaption:"",
    })
    

    const {addPost}=useAddPost();
    
    console.log(inputs)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await addPost(inputs);
    }

  return (
    <div>
       <div className="post-creator">
        <div className="post-header">
            <h1>Create New Post</h1>
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="post-content">
            <div className="upload-area">
                <div className="upload-icon">📸</div>
                <p className="upload-text">Drag and drop your photo here</p>
                <input type="file" id="file-upload" name="postImageUrl" hidden accept="image/*"
                onChange={(e)=>setInputs({...inputs,postImageUrl:e.target.files[0]})}></input>
                <label htmlFor="file-upload" className="upload-button">Choose from computer</label>
            </div>

            <div className="caption-area">
                <label htmlFor="caption" className="caption-label">Write a caption</label>
                <textarea id="caption" className="caption-input" placeholder="Write a caption..."
                onChange={(e)=>setInputs({...inputs,postCaption:e.target.value})}></textarea>
            </div>
        </div>

        <div className="post-footer">
            <button type="submit" className="share-button">Share</button>
        </div>
        </form>
    </div>
    </div>
  )
}

export default AddPost
