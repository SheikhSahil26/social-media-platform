import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';


const useGetStories = () => {
    const [stories,setStories]=useState([]);

    const fetchUserStories=async (username)=>{
        try{

            const res=await fetch(`/api/post/story/${username}`,{

                method:"GET",
                
            })
            const data =await res.json();

            if(data.error) throw new Error(data.error)


            console.log(data.stories);

            setStories(data.stories || []);


            return data.stories || [];


        }catch(error){
            toast.error(error.message)
            return []
        }
    }

  

    return {stories,fetchUserStories}

}

export default useGetStories
