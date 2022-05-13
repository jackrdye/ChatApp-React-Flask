import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Message(props) {
  const sender = props.sender
  const message = props.message
  const username = useSelector(state => state.profile.username)

  const myMessage = () => {
    return (
      <Row className=' my-1' >
        <Container className='w-50 my-2 text-start me-5 border bg-info'>
          <p className='fs-6 mb-0'>{username === sender ? "You" : sender }:</p>
          <p className='fs-4 mb-1'>{message}</p>
        </Container>
      </Row>
    )
  }
  const otherMessage = () => {
    return (
      <Row className=' my-1' >
        <Container className='w-50 my-2 text-start ms-5 border bg-success'>
          <p className='fs-5 mb-0'>{username === sender ? "You" : sender }:</p>
          <p className='fs-4 mb-0'>{message}</p>
        </Container>
      </Row>
    )
  }



  return (
  <>
    {username === sender ? myMessage() : otherMessage() }
  </>
  )
}

export default Message