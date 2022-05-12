import React from 'react'
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap'

export function CourseTab(props) {
  const setDisplayAskQuestion = props.setDisplayAskQuestion

  
  return (
    <>
      {/* Ask Question Button */}
      <Button className='rounded-0 mb-5 w-100' onClick={() => setDisplayAskQuestion(true)}>Ask Question</Button>
      {/* Course List */}
      <h4 className='text-center'>Courses</h4>
      <ListGroup>
        <ListGroup.Item active className='border-primary rounded-0 bg-primary'>INFO2222</ListGroup.Item>
        <ListGroup.Item>INFO3333</ListGroup.Item>
        <ListGroup.Item>INFO4444</ListGroup.Item>
      </ListGroup>
      {/* Tags to display */}
      <h6 className='text-center mt-5'>Tags</h6>
      <InputGroup className="">
          <FormControl
            placeholder="Enter tag"
            aria-label="Enter tag"
            aria-describedby="basic-addon2"
            className='bg- rounded-0'
          />
        </InputGroup>
      {/* Tag input */}
    </>
  )
}

export default CourseTab
