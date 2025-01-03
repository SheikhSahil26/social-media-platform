import React from 'react'
import { useAuthContext } from '../context/authContext'

const useLogOut = () => {

    const {setAuthUser}=useAuthContext()

    const logout=async ()=>{

        try{

            const res=await fetch("/api/auth/logout",{
                method:"POST",
                // headers:{"Content-Type":"application/json"},  no body then no header
                // body:JSON.stringify({username,password}),
            })

            const data = await res.json();

            if(data.error)throw new Error(data.error)

            console.log(data);

            localStorage.removeItem('user')

            setAuthUser(null);


        }
        catch(error){
            console.log(error)
            toast.error(error.message);
        }
    }
    return {logout}
}

export default useLogOut
