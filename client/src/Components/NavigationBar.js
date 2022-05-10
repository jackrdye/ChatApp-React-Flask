import React, { useEffect } from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../features/profile/profileSlice'

const loggedOutNavbar = (
  <Navbar bg="primary">
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

const loggedInNavbar = (
  <Navbar bg="primary">
  <Container>
    <Navbar.Brand href="/">EMS</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/discussion">Discussion</Nav.Link>
      <Nav.Link href="/chat">Chat</Nav.Link>
      <Nav.Link href="/resources">Resources</Nav.Link>
      <Nav.Link href="/help">Help</Nav.Link>
    </Nav>
  </Container>
</Navbar>
)


function NavigationBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

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