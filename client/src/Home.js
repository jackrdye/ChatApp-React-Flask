import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetProfile } from './features/profile/profileSlice'

function Home() {
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.profile.isLoggedIn)

  const loggedIn = () => {
    return (
      <Container className='text-center'>
        <Row className='my-5'>
          <h3>Welcome to Edstem 2!</h3>
        </Row>
        <Row className='my-5'>
          <Col>
            <Button className='w-50 ms-4 my-5' style={{maxWidth: "200px"}} onClick={() => {dispatch(resetProfile())}}>Logout</Button>
          </Col>
        </Row>
      </Container>
    )
  }

  const loggedOut = () => {
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

  return (
    <>
      {isLoggedIn ? loggedIn() : loggedOut()}
    </>
  )
}

export default Home