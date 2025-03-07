import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {setCurrentUser,currentUser} = useContext(UserContext);
    const navigate = useNavigate();

    setCurrentUser(null)
    useEffect(()=>{
      if(!currentUser?.token){
        navigate('/login')
      }
    },[currentUser])
    navigate('/login')
    

  return (
    <></>
  )
}

export default Logout