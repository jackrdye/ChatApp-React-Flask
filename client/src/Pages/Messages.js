import { generateKeys, exportKey, importVerifyKey, decryptText, verifyText } from '../Encryption/Keys'
import _ from 'lodash'

import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import Friends from '../Components/Friends';
import Conversation from '../Components/Conversation'
const cookies = new Cookies()

function Messages() {
  const abortController = new AbortController();
  const redirect = useNavigate() 
  const sessionKey = cookies.get("session_key")
  // const privateKey = useState(localStorage.get("private_key") === null ? "" : localStorage.get("private_key"))
  // const signKey = useState(localStorage.get("sign_key") === null ? "" : localStorage.get("sign_key"))
  const [keys, setKeys] = useState({})
  const [componentHeight, setComponentHeight] = useState(window.innerHeight - 56)
  const [isLoading, setIsLoading] = useState(true)

  const [conversations, setConversations] = useState({}) //{'bob': [['jack', "Hey There Bob"], ['bob', "Hey Jack"]]}
  const [friends, setFriends] = useState([]) //['alice', 'bob', 'haowen']
  const [friendsKeys, setFriendsKeys] = useState({}) // {"bob": [publicKey, verifyKey]}
  const [selectedFriend, setSelectedFriend] = useState("") // "bob"
  const [privateKey, setPrivateKey] = useState()
  // const [friendVerifyKey, setFriendVerifyKey] = useState("we have not been set")

  const addFriend = (name) => {
    setFriends((friends) => {
      return [...friends, name]
    })
    setConversations((conversations) => {
      return ({...conversations, [name]: []})
    })
  }

  useEffect(async () => {
    // Ensure user is logged in
    if (sessionKey === undefined) {
      alert("You must be logged in to view messages") 
      redirect("/login")
    }

    // Generate New Keys
    let result = await generateKeys()
    setKeys(({'public_key': result[0], 
      'private_key': result[1], 
      'sign_key': result[2], 
      'verify_key': result[3] 
    }))
    // Send public, verify keys to server
    setPrivateKey(result[1])
    console.log(result[0])
    console.log(result[1])
    const exportedPubKey = await exportKey(result[0])
    console.log(result[2])
    console.log(result[3])
    const exportedVerifyKey = await exportKey(result[3])

    fetch("/api/set_keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({'public_key': exportedPubKey, 'verify_key': exportedVerifyKey})
    }
      )
    .then(response => response.json())
    .catch(error => console.log(error))

    // Load Friends publicKeys and Verify Keys
    const updateFriendsKeys = setInterval(() => {
      fetch("/api/get_friends_keys", {
        method: "GET",
      })
      .then(response => {
        // console.log(friendsKeys)
        return response.json()
      })
      .then(data => {
        // const resetKeys = await _.isEqual(friendsKeys, data['keys']) 
        // console.log(!resetKeys)
        // if (!resetKeys) {
        //   console.log("lets change these keys baby")
        //   setFriendsKeys(data['keys'])
        // }
        // Object.keys(data['keys']).map((name, i) => {
        //   setFriendsKeys(prevKeys => ({
        //     ...prevKeys, 
        //     [name]: data['keys'][name]
        //   }))
        // })
        console.log(data['keys'])
        setFriendsKeys(prevFriendsKeys => ({
          ...prevFriendsKeys, 
          ...data['keys'] })
        )
      })
      .catch(error => console.log(error))
    }, 10000)


    // Load friends list from api
    fetch("/api/get_friend_list").then(
      response => response.json())
    .then(
      data => {
        try {
          setSelectedFriend(data['friends'][0])
        } catch {
          if (data['error'] === "Invalid session key") {
            alert("Invalid session please log in again")
            redirect("/login")
          }
        }
        setFriends(data['friends'])
        // initialise conversation with each friend
        data['friends'].forEach((friend) => {
          setConversations(conversations => ({
            ...conversations, 
            ...{[friend]: []}
          }))
        })
        // setConversations({'a': [['jack', "Hey There Bob"], ['a', "Hey Jack"]]})                
        setIsLoading(false)
      })
    .catch(error => console.log(error))
    
    // Set interval to fetch get_messages
    const interval = setInterval(() => {
      fetch("/api/get_messages")
      .then(response => response.json())
      .then(data => {
        try {
          console.log(data)
          

          data['messages'].map( async (message) => {
            // console.log(message)
            let friendVerifyKeyObject = await importVerifyKey(JSON.parse(message[3]))
            // console.log(friendVerifyKeyObject)
            let encryptedData = message[1]
            // console.log(keys)
            // console.log(privateKey)
            // console.log(result[1]) - private_key

            let decryptedMessage = await decryptText(result[1], encryptedData)
            // console.log(decryptedMessage)
            let signatureData = message[2];
            let verifyMessage = await verifyText(friendVerifyKeyObject, decryptedMessage, signatureData)
            console.log(verifyMessage)
            if (verifyMessage) {
              setConversations(conversations => ({
                ...conversations,
                ...{[message[0]]: [
                  ...conversations[message[0]],
                  [message[0], decryptedMessage]
                ]}
              }))
            } else {
              window.alert(`You recieved a compromised message from ${message[0]}`)
            }
          })
        } catch {
          if (data['error'] === "Invalid session key") {
            alert("Invalid session please log in again")
            // redirect("/login")
          }
        }
      })
      .catch(error => console.log(error))
    }, 1000)

    return () => {clearInterval(interval); clearInterval(updateFriendsKeys); abortController.abort();window.removeEventListener('resize', setComponentHeight(window.innerHeight - 56));} // cleanup component if user is redirected to login
  }, [])


  // useEffect(() => {
  //   // Load friends list from api
  //   fetch("/api/get_friend_list").then(
  //     response => response.json())
  //   .then(
  //     data => {
  //       try {
  //         setSelectedFriend(data['friends'][0])
  //       } catch {
  //         if (data['error'] === "Invalid session key") {
  //           alert("Invalid session please log in again")
  //           redirect("/login")
  //         }
  //       }
  //       setFriends(data['friends'])
  //       // initialise conversation with each friend
  //       data['friends'].forEach((friend) => {
  //         setConversations(conversations => ({
  //           ...conversations, 
  //           ...{[friend]: []}
  //         }))
  //       })
  //       // setConversations({'a': [['jack', "Hey There Bob"], ['a', "Hey Jack"]]})                
  //       setIsLoading(false)
  //     })
  //   .catch(error => console.log(error))
    
  //   // Set interval to fetch get_messages
  //   const interval = setInterval(() => {
  //     fetch("/api/get_messages")
  //     .then(response => response.json())
  //     .then(data => {
  //       try {
  //         console.log(data)
          

  //         data['messages'].map( async (message) => {
  //           console.log(message)
  //           let friendVerifyKeyObject = await importVerifyKey(JSON.parse(message[3]))
  //           console.log(friendVerifyKeyObject)
  //           let encryptedData = message[1]
  //           console.log(keys)
  //           console.log(privateKey)

  //           let decryptedMessage = await decryptText(privateKey, encryptedData)
  //           console.log(decryptedMessage)
  //           let signatureData = message[2];
  //           let verifyMessage = await verifyText(friendVerifyKeyObject, encryptedData, signatureData)
  //           console.log(verifyMessage, decryptedMessage)
  //           if (verifyMessage) {
  //             setConversations(conversations => ({
  //               ...conversations,
  //               ...{[message[0]]: [
  //                 ...conversations[message[0]],
  //                 decryptedMessage
  //               ]}
  //             }))
  //           } else {
  //             window.alert(`You recieved a compromised message from ${message[0]}`)
  //           }
  //         })
  //       } catch {
  //         if (data['error'] === "Invalid session key") {
  //           alert("Invalid session please log in again")
  //           redirect("/login")
  //         }
  //       }
  //     })
  //     .catch(error => console.log(error))
  //   }, 1000)

  //   return () => {clearInterval(interval); abortController.abort();window.removeEventListener('resize', setComponentHeight(window.innerHeight - 56));} // cleanup component if user is redirected to login
  // }, [])
 

  // If setup useEffect is still loading
  if (isLoading) {
    return <></>
  }

  return (
    <Container fluid className='border-top border-bottom border-dark' style={{height: `${componentHeight}px`}}>
      <Row className=' h-100'>
        <Col sm={3} xs={4} className='border-end border-dark p-0 m-0'>
          <Friends friends={friends} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} addFriend={addFriend}/>
        </Col>
        <Col className='border- p-0 m-0'>
          <Conversation conversations={conversations} selectedFriend={selectedFriend} keys={keys} friendsKeys={friendsKeys}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Messages
