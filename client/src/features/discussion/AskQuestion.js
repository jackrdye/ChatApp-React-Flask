import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createPost } from './discussionSlice'

function AskQuestion(props) {
  const dispatch = useDispatch()
  const setDisplayAskQuestion = props.setDisplayAskQuestion
  const [title, setTitle] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const [body, setBody] = useState("")

  const addTag = () => {
    setTags(tags => [...tags, tag])
    setTag("")
  }

  const onSubmitPost = (e) => {
    e.preventDefault()
    dispatch(createPost({title: title, body:body, tags: []}))
    alert("Your question has been submitted")
    setDisplayAskQuestion(false)
  }

  return (
    <Container className='p-4 border h-75'>
      {/* Title */}
      <InputGroup className="pb-4 pt-3 border-bottom">
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
      <InputGroup className="pb-4 pt-3 w-50 ">
        <p className='my-auto me-3'>Tags:</p>
        <div>
        <InputGroup>
        <FormControl
          // className="rounded-3"
          placeholder="Enter tag here..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          aria-label=""
          aria-describedby="basic-addon1"
          onKeyDown={(e) => {if (e.key === "Enter") {addTag(tag)}}}
        />
        <InputGroup.Text id='basic-addon1' className="btn btn-outline-primary bi bi-plus-lg"/>
        </InputGroup>
        </div>
      </InputGroup>
      {/* Display Current Tags */}
      <div className="d-flex pb-3">
        {tags.map((tag) => {
          return (
            <div key={tag} className='p-1 mx-1 '>
              {/* {tag}
              <CloseButton /> */}
              <InputGroup>
                <InputGroup.Text id='basic-addon1' className="bg-light text-dark">
                  {tag}
                </InputGroup.Text>
                <InputGroup.Text 
                  id='basic-addon1' 
                  className="btn btn-outline-secondary bi bi-x-lg" 
                  onClick={
                    () => setTags(tags => {return [...tags].filter(item => item !== tag)})
                  }
                />
              </InputGroup>
            </div>
          )
        })}
      </div>

      {/* Question Body */}
      <p className='pt-2 border-top'>Body:</p>
      <InputGroup className='pt-2 h-50'>
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