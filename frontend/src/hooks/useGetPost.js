import React,{useEffect, useState} from 'react'
import { useAuthContext } from '../context/authContext'
import toast from 'react-hot-toast'

const useGetPost = (username) => {

    const [posts,setPosts]=useState([])

    const authUser=useAuthContext();
    
    console.log(username)
    
   useEffect(()=>{

    const getPosts=async ()=>{
        try{
        const res=await fetch(`/api/post/getposts/${username}`,{
            method:"GET",
        })
        const data=await res.json();

        if(data.error)throw new Error(data.error);

        console.log(data);

        setPosts(data.posts || []);

       
    }catch(error){
        toast.error(error.message);
    }
   

}
getPosts();


   },[username])
        
        
    return {posts}

}

export default useGetPost
