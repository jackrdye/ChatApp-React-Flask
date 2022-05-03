import React, {useState} from 'react'
import Message from './Message'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { encryptText, importPublicKey, signText, exportKey } from '../Encryption/Keys'

function Conversation(props) {
  const conversations = props.conversations
  const selectedFriend = props.selectedFriend
  const currentConversation = conversations[selectedFriend]
  const [message, setMessage] = useState('')
  const keys = props.keys
  const friendsKeys = props.friendsKeys


  if (conversations[selectedFriend] == undefined) {
    return <></>
  }


  const handleInputChange = (event) => {
    setMessage(event.target.value)
  }


  const createMessage = (sender, message, i) => {
    if (sender === selectedFriend ) {
      return <Message key={i} primary={false} message={message} />
    } else {
      return <Message key={i} primary={true} message={message} />
    }
  }

  const onSubmitSend = async () => {
    // console.log(friendsKeys[selectedFriend])
    if (friendsKeys[selectedFriend] === []) {
      window.alert("Friend has not logged in")
      return
    }
    // console.log(friendsKeys[selectedFriend][0])
    const friendPubKey = await importPublicKey(JSON.parse(friendsKeys[selectedFriend][0]))
    const signKey = await keys['sign_key']
    const verifyKeyExport = await exportKey(keys['verify_key'])
    const encryptedData = await encryptText(friendPubKey, message)
    const signatureData = await signText(signKey, message)
    console.log(signatureData)

    fetch("/api/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({'recipient': selectedFriend, 'message': encryptedData, 'signature': signatureData, 'verify_key': verifyKeyExport})
    })
    .then(response => response.json())
    .then(data => {
      if (data['result'] === 'success') {
        // Insert Message into current conversation
        conversations[selectedFriend].push([data['sender'], message])

        // Reset Message
        setMessage("")
      } else if (data['result'] === 'failed') {
        alert("Please log in again")
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <>
    <div className='border border-dark overflow-auto' style={{height: '85%'}}>
      {currentConversation.map((message, i) => {
        return (
            createMessage(message[0], message[1], i)
        )
      })}
    </div>
    <InputGroup className="mt-4 p-2">
      <FormControl
        placeholder="Type Here"
        aria-label="Message"
        aria-describedby="basic-addon2"
        value={message}
        onChange={handleInputChange}
      />
      <Button onClick={onSubmitSend} variant="outline-primary" id="button-addon2">
        Send
      </Button>
    </InputGroup>
    </>
  )
}

export default Conversation