import React, { createContext,useContext } from "react";
import { useState } from "react";

export const ProfileContext=createContext(null);

export const useProfileContext=()=>{
    return useContext(ProfileContext);
}



export const ProfileContextProvider=({children})=>{
    const [profileUser,setProfileUser]=useState(JSON.parse(localStorage.getItem('user'))||null) // to ensure that intitally it is null and after loading profile page 
    const [loading,setLoading]=useState(true)

    return <ProfileContext.Provider value={{profileUser,setProfileUser,loading,setLoading}}>{children}</ProfileContext.Provider>
}