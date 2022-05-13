import React from 'react'
import { Container } from 'react-bootstrap'

function Comment(props) {
  const author = props.comment.author
  const body = props.comment.body
  const commentID = props.comment.commentID
  const createdOn = props.comment.createdOn
  const parentCommentID = props.comment.parentCommentID

  return (
    <Container className='p-3 my-2 border rounded-3 bg-secondary text-light'>
      <p className='fs-6 p-0 mb-0 fw-light'>{author}</p>
      <p className='fs-5 p-0 mt-0 mb-1'>{body}</p>
    </Container>
  )
}

export default Comment