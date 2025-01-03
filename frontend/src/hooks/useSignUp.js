import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext.jsx'

const useSignUp=()=>{

    const {setAuthUser}=useAuthContext();

    const signup=async({username,password})=>{
        
        try{
            const res=await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password}),
            })
            const data = await res.json();

            if(data.error) {
                throw new Error(data.error)
            }
            console.log(data);
            localStorage.setItem('user',JSON.stringify(data));

            setAuthUser(data);
        }
        catch(error){
            // toast.error(error.message)
            console.log(error);
            toast.error(error.message);
        }
    }
    return {signup}
}

export default useSignUp;