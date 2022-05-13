import React, { useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export function Post() {
  const currentPost = useSelector(state => state.discussion.currentPost)

  useEffect(() => {
    console.log(currentPost)
  })

  const displayPost = () => {
    if (currentPost.title === undefined) {
      return <h4 className='text-center mt-5'>Click a post on the left to display</h4>
    } 
    return (
      <Container className='pt-3 border-bottom border-secondary'>
        <Row>
          <Col className='col-md-auto'>
            <Row className='row'>
              <Button className='btn btn-success bi bi-hand-thumbs-up rounded-0 rounded-top'></Button>
            </Row>
            <Row className='row'>
              <InputGroup.Text className='bg bg-white rounded-0'>100</InputGroup.Text>
            </Row>
            <Row className='row'>
              <Button className='btn btn-danger bi bi-hand-thumbs-down rounded-0 rounded-bottom'></Button>
            </Row>
          </Col>
          <Col>
            <Row><h5 className='fs-2'>{currentPost.title}</h5></Row>
            <Row><h6 className='fs-6'>{currentPost.author}</h6></Row>
            <Row>
          {/* Display Current Tags */}
          <div className="d-flex pb-3">
            {currentPost.tags.map((tag) => {
              return (
                <div key={tag} className='p-1 mx-1 '>
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
  }


  return (
    <>
      {displayPost()}
      {displayComments()}
    </>
  )
}

export default Post