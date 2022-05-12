import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

function Resources() {

  return (
    <Container className=' my-4'>
      <h3 className='text-center mb-5 mt-2'>Resources</h3>
      <h5>Popular in last day:</h5>
      <Row className='m-3'>
        <Col>
          <Button className='bg-secondary border-secondary '>Tutorial 2</Button>
        </Col>
      </Row>
      <h5>Course Content</h5>
      <Row className='m-3'>
        <Col>
          <Button className='bg-secondary border-secondary'>Lecture 1</Button>
        </Col>
        <Col>
          <Button className='bg-secondary border-secondary'>Tutorial 1</Button>

        </Col>
        <Col>
        <Button className='bg-secondary border-secondary'>Tutorial 1 Solutions</Button>

        </Col>
      </Row>
      <Row className='m-3'>
        <Col>
          <Button className='bg-secondary border-secondary'>Lecture 2</Button>
        </Col>
        <Col>
          <Button className='bg-secondary border-secondary'>Tutorial 2</Button>
        </Col>
        <Col>
          <Button className='bg-secondary border-secondary'>Tutorial 2 Solutions</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Resources