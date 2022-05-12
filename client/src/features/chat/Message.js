import React from 'react'
import { Container } from 'react-bootstrap'

function Message(props) {
  const sender = props.sender
  const message = props.message

  return (
    <Container>
      Message
    </Container>
  )
}

export default Message