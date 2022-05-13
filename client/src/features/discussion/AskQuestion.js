import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createPost } from './discussionSlice'

function AskQuestion(props) {
  const dispatch = useDispatch()
  const setDisplayAskQuestion = props.setDisplayAskQuestion
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const onSubmitPost = (e) => {
    e.preventDefault()
    dispatch(createPost({title: title, body:body, tags: []}))
    alert("Your question has been submitted")
    setDisplayAskQuestion(false)
  }

  return (
    <Container className='p-4 border h-75'>
      {/* Title */}
      
      <InputGroup className="mb-4 mt-3">
        {/* <InputGroup.Text id="basic-addon1">Title</InputGroup.Text> */}
        <p className='m-auto me-3'>Title:</p>
        <FormControl
          className="rounded-3"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label=""
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      {/* Tag Selection */}
      <Row className='my-3 mx-1 h-25 rounded '>
        <Col className=''>
          <InputGroup className='mt-1'>
            <p className="m-auto me-2">Tags:</p>
            <FormControl
              placeholder='Enter tag'
              className="rounded-3"
            />
          </InputGroup>
        </Col>
        <Col className=''>

        </Col>
      </Row>

      {/* Question Body */}
      <p className='mt-2'>Body:</p>
      <InputGroup className='mt-2 h-50'>
        {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
        <FormControl 
          as='textarea'
          placeholder='Type your question here...'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          aria-label="With textarea" 
        />
      </InputGroup>
      <Button className='float-end mt-3 px-4 py-2' onClick={onSubmitPost}>Post</Button>
    </Container>
  )
}

export default AskQuestion