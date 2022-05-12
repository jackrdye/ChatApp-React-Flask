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
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <FormControl
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label=""
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      {/* Tag Selection */}
      <Row className='my-3 mx-1 h-25 rounded border'>
        <Col className='border-end'>
          <InputGroup className='mt-1 border'>
            <FormControl
              placeholder='Enter tag'
            />
          </InputGroup>
        </Col>
        <Col className='border-start'>

        </Col>
      </Row>

      {/* Question Body */}
      <InputGroup className='mt-4 h-50'>
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