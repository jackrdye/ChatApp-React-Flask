import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Navbar, Container, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetProfile, selectIsLoggedIn } from '../features/profile/profileSlice'

const loggedOutNavbar = (
  <Navbar variant='dark' bg='dark'>
    <Container>
      <Navbar.Brand href="/">EMS</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/help">Help</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
)

function NavigationBar() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const logoutOnClick = () => {
    dispatch(resetProfile())
    redirect("/")
  }

  const loggedInNavbar = (
    <Navbar variant='dark' bg="dark">
    <Container>
      <Navbar.Brand href="/">EMS</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/discussion">Discussion</Nav.Link>
        <Nav.Link href="/chat">Chat</Nav.Link>
        <Nav.Link href="/resources">Resources</Nav.Link>
        <Nav.Link href="/help">Help</Nav.Link>
      </Nav>
      <Button className="bg-dark border-dark text-white-50" onClick={logoutOnClick}>Logout</Button>
    </Container>
  </Navbar>
  )

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return (
    <>
      {isLoggedIn? loggedInNavbar : loggedOutNavbar}
    </>
  )
}

export default NavigationBar