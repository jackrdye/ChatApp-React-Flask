import React, { useEffect, useState } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Comment from './Comment';
import { downvotePost, replyToPost, upvotePost } from './discussionSlice';
import { resetProfile } from '../profile/profileSlice';
import { useNavigate } from 'react-router';

export function Post(props) {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const componentHeight = props.componentHeight
  const currentPost = useSelector(state => state.discussion.currentPost)
  const [replyMessage, setReplyMessage] = useState("")

  useEffect(() => {
    console.log(currentPost)
  })

  const submitReplyToPost = () => {
    dispatch(replyToPost({postID: currentPost.postID, body: replyMessage}))
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
    setReplyMessage("")
  }


  const displayPost = () => {
    if (currentPost.title === undefined) {
      return <h4 className='text-center mt-5'>Click a post on the left to display</h4>
    } 
    return (
      <Container className='pt-3 border-secondary'>
        <Row>
          <Col className='col-md-auto'>
            <Row className='row'>
              <Button onClick={() => {dispatch(upvotePost(currentPost.postID))}} className='btn btn-success bi bi-hand-thumbs-up rounded-0 rounded-top'></Button>
            </Row>
            <Row className='row'>
              <InputGroup.Text className='bg bg-white rounded-0 text-center'>
                <div className='mx-auto'>{currentPost.upvotes}</div>
              </InputGroup.Text>
            </Row>
            <Row className='row'>
              <Button onClick={() => {dispatch(downvotePost(currentPost.postID))}} className='btn btn-danger bi bi-hand-thumbs-down rounded-0 rounded-bottom'></Button>
            </Row>
          </Col>
          <Col>
            <Row><h5 className='fs-2'>{currentPost.title}</h5></Row>
            <Row><h6 className='fs-6 fw-light'>{currentPost.author}</h6></Row>
            <Row>
          {/* Display Current Tags */}
          <div className="d-flex pb-3">
            {currentPost.tags.map((tag) => {
              return (
                <div key={tag} className='p-1 my-auto'>
                  {/* {tag}
                  <CloseButton /> */}
                  <InputGroup size="sm">
                    <InputGroup.Text id='basic-addon1' className="bg-light text-dark rounded-pill">
                      {tag}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              )
            })}
          </div>
        </Row>
          </Col>
        </Row>
        <p className='my-4'>{currentPost.body}</p>
      </Container>
    )
  }
  const displayComments = () => {
    if (currentPost.comments === undefined) {
      return <></>
    }
    return (
      <Container className="px-4 py-0 mb-0">
        {currentPost.comments.map((comment) => {
          return <Comment key={comment.commentID} comment={comment}/>
        })}
      </Container>
    )
  }

  if (currentPost.title === undefined) {
    return (
      <div className='overflow-auto m-0 p-0' style={{maxHeight:`calc(${componentHeight} - 3px)`}}>
        <h4 className='text-center mt-5'>Click a post on the left to display</h4>
      </div>
    )
  }
  else {
    return (
      <div className='overflow-auto m-0 p-0' style={{maxHeight:`calc(${componentHeight} - 3px)`}}>
        {displayPost()}
        
        <hr/>

        <Container className="px-3 py-0 mb-0">
          <InputGroup className="w-100 p-2 m-auto">
            <FormControl
              className='text-dark'
              placeholder="Type a reply here..."
              value={replyMessage}
              onChange={(e) => {setReplyMessage(e.target.value)}}
              onKeyDown={(e) => {if (e.key === "Enter") {submitReplyToPost()}}}
              aria-label="Type a reply here"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon1" className='btn btn-outline-primary bi bi-send-fill' onClick={submitReplyToPost}>
              {/* <img src='/search-interface-symbol.png' className='' style={{width: "20px", height: "20px"}} alt=''/> */}
            </InputGroup.Text>
          </InputGroup>
        </Container>
        <hr/>

        {displayComments()}
      </div>
    )
  }
}

export default Post