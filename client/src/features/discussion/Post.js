import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export function Post() {
  const currentPost = useSelector(state => state.discussion.currentPost)

  useEffect(() => {
    console.log(currentPost)
  })

  const displayPost = () => {
    if (currentPost.title === undefined) {
      return <h4 className='text-center mt-5'>Click a post on the left to display</h4>
    } 
    return (
      <Container className='pt-3 border-bottom border-secondary'>
        <h5 className='fs-2'>{currentPost.title}</h5>
        <h6 className='fs-6'>{currentPost.author}</h6>
        <p className='my-4'>{currentPost.body}</p>
      </Container>
    )
  }
  const displayComments = () => {
  }


  return (
    <>
      {displayPost()}
      {displayComments()}
    </>
  )
}

export default Post