import React, { StrictMode, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap"
import Cookies from 'universal-cookie'
const cookies = new Cookies()

 
function Login() {
  const redirect = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitLogin = e => {
    e.preventDefault()
    fetch("/api/login", {
      method:"POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(response => response.json())
    .then(response => {
      // Login Successful
      if (response['result'] === "success") {
        // Set session cookie in browser
        let session_cookie = response['session_cookie']
        cookies.set("session_key", session_cookie, {sameSite:'strict', expires: new Date(new Date().getTime() +  1000 * 60 * 60 * 24 )})

        alert(`Hello ${username} You have successfully logged in`)
        setUsername("")
        setPassword("")
        redirect("/messages")

      // Login Failed
      } else if (response['result'] === "Invalid Credentials") {
        setPassword("")
        alert("Invalid credentials please try again")
      } 
        
    })
    .catch(error => {
      setPassword("")
      console.log(error)
    })

    
  }

  return (
    <Form className="text-left w-75 m-auto" onSubmit={onSubmitLogin}>
      <h2>Login Form</h2>
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

export default Login