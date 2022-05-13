import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetProfile } from '../profile/profileSlice'
import { fetchAllChats, recieveGroupMessages, sendGroupMessage } from './chatSlice'
import Message from './Message'



function Chat() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const messages = useSelector(state => state.chat.messages)

  const [componentHeight, setComponentHeight] = useState('calc(100vh - 56px)')
  const [messageInput, setMessageInput] = useState("")

  useEffect(() => {
    console.log(messages)
  }, [messages])

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
    .unwrap()
    .then(response => {
      // Ensure session is still valid - if not re-login 
      if (response.result === "Invalid Session Key") {
        dispatch(resetProfile())
        redirect('/login')
      }
    })
    .catch(error => console.log(error))
    setMessageInput("")
    console.log("yip")
  }

  const displayMessages = () => {
    return messages.map((messageDetails) => {
      return <Message key={messageDetails.message} sender={messageDetails.sender} message={messageDetails.message}/>
    })
  }

  const displayMessageBar = () => {
    return (
      <InputGroup className="my-3 w-75 m-auto rounded">
        <FormControl
          className='text-dark border-secondary'
          placeholder="Type your message here"
          value={messageInput}
          onChange={(e) => {setMessageInput(e.target.value)}}
          aria-label="Type your message here"
          aria-describedby="basic-addon2"
          onKeyDown={(e) => {if (e.key === "Enter") {onSendMessage(e)}}}
        />
        <Button varient="primary" className='' id="button-addon2 my-0" onClick={onSendMessage}>
          Send
        </Button>
      </InputGroup>
    )
  }



  return (
    <Container fluid className='border-top border-dark' style={{height: `${componentHeight}`, maxHeight:`${componentHeight}`}}>
      <Row className='h-100 mh-100'>
        <Col sm={3} xs={4} className='border-end border-dark p-0 m-0'>
        <h4 className='text-center mt-2'>Courses</h4>
          <ListGroup>
            <ListGroup.Item active className='border-primary rounded-0 bg-primary'>INFO2222</ListGroup.Item>
            <ListGroup.Item>INFO3333</ListGroup.Item>
            <ListGroup.Item>INFO4444</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className='my-1 h-100 mh-100'>
          <Container className='my-1 h-75 px-3 py-1 mh-75 border overflow-auto'>
            {displayMessages()}
          </Container>
          {displayMessageBar()}
        </Col>
      </Row>
    </Container>
  )
}

export default Chat