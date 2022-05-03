import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap"
import Navigation from '../Components/Navigation';

 
function Register() {
  const redirect = useNavigate() 
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitRegister = e => {
    e.preventDefault()
    // Call API - Register
    fetch("/api/register", {
      method:"POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      // Registration Successful
      if (response['result'] === "success") {
        alert(`You have successfully registered as ${username}`)
        setUsername("")
        setPassword("")
        // Redirect to login
        redirect("/login")
        
      // Registration Failed
      } else if (response['result'] === "username already exists") {
        alert(`The username ${username} already exists please choose another`)
        setUsername("")
        setPassword("")
      } 
        
    })
    .catch(error => {
      setPassword("")
      console.log(error)
    })

    
  }

  return (
    <Form className="text-left w-75 m-auto" onSubmit={onSubmitRegister}>
      <h2>Please Register Below</h2>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => {setUsername(e.target.value)}}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register