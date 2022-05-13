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
        <Container className='w-50 my-2 py-2 text-light me-5 bg-primary rounded rounded-pill'>
          <div className='d-flex'>
            <p className='fs-6 ps-3 mb-0'>{username === sender ? "You" : sender }:</p>
          </div>
          <div className='d-flex'>
            <p className='fs-4 ps-3 mb-1'>{message}</p>
          </div>
        </Container>
      </Row>
    )
  }
  const otherMessage = () => {
    return (
      <Row className=' my-1 ' >
        <Container className='w-50 my-2 py-2 text-light ms-5 bg-secondary rounded rounded-pill'>
          <div className='d-flex'>
            <p className='fs-6 ps-3 mb-0'>{username === sender ? "You" : sender }:</p>
          </div>
          <div className='d-flex'>
            <p className='fs-4 ps-3 mb-1'>{message}</p>
          </div>
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