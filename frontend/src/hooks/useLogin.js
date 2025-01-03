import React from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext.jsx'

const useLogin = () => {
  const {setAuthUser}=useAuthContext();

  const login=async({username,password})=>{

    try{
        const res=await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password}),
        })
        console.log(res);
        const data=await res.json()
    
        if(data.error){
            throw new Error(data.error)
        }

        data.success="";
        
        localStorage.setItem('user',JSON.stringify(data))

        setAuthUser(data);
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
   
    
  }
  return {login}
}

export default useLogin
