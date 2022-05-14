import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetProfile } from '../profile/profileSlice'
import { createPost } from './discussionSlice'

function AskQuestion(props) {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const setDisplayAskQuestion = props.setDisplayAskQuestion
  const [title, setTitle] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const [body, setBody] = useState("")

  const addTag = () => {
    if (!tags.includes(tag)) {
      setTags(tags => [...tags, tag])
    }
    setTag("")
  }

  const onSubmitPost = (e) => {
    e.preventDefault()
    dispatch(createPost({title: title, body:body, tags: tags}))
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
    alert("Your question has been submitted")
    setDisplayAskQuestion(false)
  }

  return (
    <Container className='p-4 h-75'>
      {/* Title */}
      <InputGroup>
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
      <hr/>

      {/* Tag Selection */}
      <InputGroup className="w-50 ">
        <p className='my-auto me-3'>Tags:</p>
        <div>
        <InputGroup>
        <FormControl
          placeholder="Enter tag here..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={
            (e) => {if (e.key === "Enter") {
              addTag(tag)
            }}
          }
          aria-label=""
          aria-describedby="basic-addon1"
        />
        <InputGroup.Text 
          id='basic-addon1' 
          className="btn btn-outline-primary bi bi-plus-lg" 
          onClick={(e) => addTag(tag)}
        />
        </InputGroup>
        </div>
      </InputGroup>
      {/* Display Current Tags */}
      <div className="d-flex flex-wrap">
        {tags.map((tag) => {
          return (
            <div key={tag} className='p-1 mx-1 pt-4'>
              {/* {tag}
              <CloseButton /> */}
              <InputGroup size="sm">
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
      
      <hr/>

      {/* Question Body */}
      <p className='pt-2'>Body:</p>
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