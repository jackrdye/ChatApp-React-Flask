import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetProfile } from '../profile/profileSlice'



function Chat() {
  const dispatch = useDispatch()
  const redirect = useNavigate()


  useEffect(() => {
    dispatch(
      // dispact - 
    )
    .unwrap()
    .then((response) => {
      // Ensure session is still valid - if not re-login 
      if (response.result === "Invalid Session Key") {
        dispatch(resetProfile())
        redirect('/login')
      }
    })
    .catch(error => {
      alert("An error occured please try again or refresh the page")
      console.log(error)
    })
  
  })



  return (
    <div>Chat</div>
  )
}

export default Chat