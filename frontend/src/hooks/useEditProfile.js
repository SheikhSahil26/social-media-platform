import React from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useEditProfile = () => {

    const {authUser,setAuthUser}=useAuthContext()

    const editProfile=async({username,bio,profilePicUrl})=>{

        console.log(profilePicUrl)

        try{
            const formData = new FormData();
            formData.append('username', username); // Add username
            formData.append('bio', bio);           // Add bio
            formData.append('profilePicUrl', profilePicUrl);

            const res=await fetch("/api/user/editprofile",{
                method:"POST",
                
                body:formData
            })

            const data=await res.json()

            if(data.error) throw new Error(data.error)

                console.log(data)
               

                localStorage.setItem("user", JSON.stringify(data)); 

                data.sucess="logged in successfully"
                

            setAuthUser(data);

            toast.success(data.success)

        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    return {editProfile}


}

export default useEditProfile
