import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { login } from './profileSlice';

 
function Login() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitLogin = e => {
    e.preventDefault()
    dispatch(login({
      username: username, 
      password: password})
    )
    .unwrap()
    .then((response) => {
      // Login Successful
      if (response.result === 'success') {
        alert(`Hello ${username} You have successfully logged in`)
        setUsername("")
        setPassword("")
        redirect("/discussion")
      } else if (response.result === "Invalid Credentials") {
        // Login Failed
        setPassword("")
        alert("Invalid credentials please try again")
      }
    })
    .catch(error => {
      setPassword("")
      alert("An error occured please try again")
      console.log(error)
    })

    
  }

  return (
    <Form className="text-left w-75 m-auto" onSubmit={onSubmitLogin}>
      <h2>Login Form</h2>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
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