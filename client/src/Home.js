import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function Home() {
  const redirect = useNavigate()

  return (
    <Container className='text-center'>
      <Row className='my-5'>
        <h3>Welcome to Edstem 2!</h3>
      </Row>
      <Row className='my-5'>
        <Col>
          <Button className='w-50 ms-4 my-5' style={{maxWidth: "200px"}} onClick={() => {redirect("/login")}}>Login</Button>
        </Col>
        <Col>
          <Button className='w-50 me-4 my-5' style={{maxWidth: "200px"}} onClick={() => {redirect("/register")}}>Register</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home