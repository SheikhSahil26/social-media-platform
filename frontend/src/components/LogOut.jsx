import React from 'react'
import useLogOut from '../hooks/useLogOut'

const LogOut = () => {

    const {logout}=useLogOut();

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default LogOut
