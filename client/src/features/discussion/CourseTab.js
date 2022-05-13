import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container, FormControl, InputGroup, ListGroup } from 'react-bootstrap'

export function CourseTab(props) {
  const setDisplayAskQuestion = props.setDisplayAskQuestion

  
  return (
    <>
      {/* Ask Question Button */}
      <Container className="my-3">
        <Button className='rounded-2 mb-5 w-100' onClick={() => setDisplayAskQuestion(true)}>Ask Question</Button>
      </Container>
      {/* Course List */}
      <h4 className='text-center'>Courses</h4>
      <ListGroup>
        <ListGroup.Item active className='border-secondary rounded-0 bg-secondary'>INFO2222</ListGroup.Item>
        <ListGroup.Item>INFO3333</ListGroup.Item>
        <ListGroup.Item>INFO4444</ListGroup.Item>
      </ListGroup>
      {/* Tags to display */}
      <h6 className='text-center mt-5'>Tags</h6>
      <InputGroup className="w-75 m-auto rounded-3">
          <FormControl
            placeholder="Enter tag"
            aria-label="Enter tag"
            aria-describedby="basic-addon2"
            // className='bg- rounded-3'
          /> 
          <InputGroup.Text id='basic-addon1' className="btn btn-outline-primary bi bi-plus-lg">
            {/* <img src='/search-interface-symbol.png' className='' style={{width: "20px", height: "20px"}}  alt=''/> */}
          </InputGroup.Text>
        </InputGroup>
      {/* Tag input */}
    </>
  )
}

export default CourseTab
