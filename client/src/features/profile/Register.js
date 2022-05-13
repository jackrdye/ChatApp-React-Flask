import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from './profileSlice'
import { selectIsLoggedIn } from './profileSlice'


 
function Register() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitForm = async (e) => {
    e.preventDefault()
    dispatch(register({
      username: username, 
      password: password})
    )
    .unwrap()
    .then((response) => {
      console.log(response)
      if (response.result === "success") {
        alert(`You have successfully registered as ${username}`)
        setUsername("")
        setPassword("")
        dispatch(login({
          username: username, 
          password: password})
        )
        redirect("/discussion")
      } else if (response.result === "username already exists") {
        alert(`The username ${username} already exists please choose another`)
        setUsername("")
        setPassword("")
      }
    })
    .catch(error => {
      setPassword("")
      alert("An error occured please try again")
      console.log(error)
    })
    
  }
  


  return (
    <Form className="text-left w-75 m-auto" onSubmit={onSubmitForm}>
      <h2 className='text-center my-3'>Please Register Below</h2>
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
      <Container className="text-center my-4">
        <Button className='px-5 py-2' variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  )
}

export default Register