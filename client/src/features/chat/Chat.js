import React, { useEffect, useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetProfile } from '../profile/profileSlice'
import { fetchAllChats, recieveGroupMessages, sendGroupMessage } from './chatSlice'
import Message from './Message'



function Chat() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const messages = useSelector(state => state.chat.messages)

  const [componentHeight, setComponentHeight] = useState(window.innerHeight - 56)
  const [messageInput, setMessageInput] = useState("")


  useEffect(() => {
    dispatch(
      recieveGroupMessages()
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
    
  
  }, [])

  const onSendMessage = (e) => {
    e.preventDefault()
    dispatch(sendGroupMessage({message: messageInput}))
  }

  const displayMessages = () => {
    messages.map((messageDetails) => {
      return <Message sender={messageDetails.sender} message={messageDetails.message}/>
    })
  }

  const displayMessageBar = () => {

  }



  return (
    <Container fluid className='border-top border-bottom border-dark' style={{height: `${componentHeight}px`}}>
      <Row className=' h-100'>
        <Col sm={3} xs={4} className='border-end border-dark p-0 m-0'>
        <h4 className='text-center mt-2'>Courses</h4>
          <ListGroup>
            <ListGroup.Item active className='border-primary rounded-0 bg-primary'>INFO2222</ListGroup.Item>
            <ListGroup.Item>INFO3333</ListGroup.Item>
            <ListGroup.Item>INFO4444</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className='border- p-0 m-0'>
          {displayMessages()}
          {displayMessageBar()}
        </Col>
      </Row>
    </Container>
  )
}

export default Chat