import React from 'react'
import { Row } from 'react-bootstrap'

function Message(props) {
  const message = props.message
  const primary = props.primary


  const displayMessage = (primary) => {
    if (primary) { // Current users message
      return (
        <Row className='justify-content-end text-end border m-2'>
          <div className="p-2 m-1 border border-primary rounded-pill" style={{maxWidth: '50%'}}>
            <p className="p-2 m-1 border border-primary rounded-pill">{message}</p>
          </div>
        </Row>
      )
    } else { // Friends message
      return ( 
        <Row className='justify-content-start text-start border m-2'>
          <div className="p-2 m-1 border border-secondary rounded-pill" >{message}</div>
        </Row>
      )
    }
  }
 
  return (
    <>
      {displayMessage(primary)}
    </>
  )
}

export default Message