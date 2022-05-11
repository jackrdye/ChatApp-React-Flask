import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchAllPosts } from './discussionSlice'
import { resetProfile } from '../profile/profileSlice'



function Discussion() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const [sortBy, setSortBy] = useState("relevance") // relevance || latest || earliest || upvotes
  const [tags, setTags] = useState([])

  useEffect(() => {
    dispatch(fetchAllPosts({
      sortOrder: sortBy, 
      tags: tags})
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
    <div>

    </div>
  )
}

export default Discussion