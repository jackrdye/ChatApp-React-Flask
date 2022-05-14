import React, {useState} from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container, FormControl, InputGroup, ListGroup } from 'react-bootstrap'

export function CourseTab(props) {
  const setDisplayAskQuestion = props.setDisplayAskQuestion

  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])

  const addTag = () => {
    if (!tags.includes(tag)) {
      setTags(tags => [...tags, tag])
    }
    setTag("")
  }
  
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}

            onKeyPress={
              (e) => {if (e.key === "Enter") {
                addTag(tag)
              }}
            }
          /> 
          <InputGroup.Text id='basic-addon1' 
          className="btn btn-outline-primary bi bi-plus-lg"
          onClick={(e) => addTag(tag)}/>
        </InputGroup>
      {/* Tag input */}
      {/* Display Current Tags */}
      <Container className="d-flex flex-wrap">
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
      </Container>
    </>
  )
}

export default CourseTab
