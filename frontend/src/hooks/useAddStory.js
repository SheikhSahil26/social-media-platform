import React from 'react'
import toast from 'react-hot-toast'

const useAddStory = () => {
    const addStory=async({storyContentUrl})=>{ 
        try{
            console.log(storyContentUrl)
            const formData = new FormData();
            formData.append('storyContentUrl', storyContentUrl); // Add StoryCOntent
            
            const res=await fetch("/api/post/story/add",{
                method:"POST",
                body:formData,
            })

            const data=await res.json();

            console.log(data)

            if(data.error)throw new Error(data.error)

            toast.success(data.success) 



        }catch(error){
            console.log(error)
            toast.error(error.message);
        }
    }

    return {addStory};
}

export default useAddStory
