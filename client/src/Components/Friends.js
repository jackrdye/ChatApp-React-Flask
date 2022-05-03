import React, { useEffect } from 'react'
import { ListGroup, Button } from 'react-bootstrap'

function Friends(props) {
  const friends = props.friends
  const selectedFriend = props.selectedFriend
  const setSelectedFriend = props.setSelectedFriend
  const addFriend = props.addFriend //takes name as input

  useEffect(() => {
    // Set interval to fetch friend requests
    const interval = setInterval(() => {
      fetch("/api/check_for_friend_requests")
      .then(response => response.json())
      .then(data => {
        try {
          data['requests'].map((username) => {
            const acceptRequest = window.confirm(`${username} wants to add you as a friend! Do you wish to accept?`)
            fetch("/api/accept_friend_request", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({'recipient': username, 'action':acceptRequest})
            })
            
            if (acceptRequest) {
              addFriend(username)
            }
          })
        } catch {
          if (data['error'] == "Invalid session key") {
            alert("Invalid session please log in again")
          }
        }
      })
      .catch(error => console.log(error))
    }, 10000)

    return () => {clearInterval(interval)}
  }, [])


  const onAddFriend = () => {
    const friendName = prompt("Please enter the username")
    fetch("/api/send_friend_request", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'recipient': friendName})
    })
    .then(response => response.json())
    .then(data => {
      if (data['result'] == 'success') {
        alert("Friend Request Sent!")
      } else if (data['result'] == 'failed - user does not exist') {
        alert('There is no user with the username you provided')
      } else if (data['result'] == 'failed') {
        alert("Please log in again")
      }
    })
    .catch(error => console.log(error))
  }

  if (friends == undefined) {
    return <></>
  }

  return (
    <>
      <ListGroup className='overflow-auto' style={{height: '90%'}}>
        {friends.map((friend) => {
          return <ListGroup.Item className='rounded-0' key={friend} onClick={() => {setSelectedFriend(friend)}} active={(selectedFriend == friend)? true : false}>{friend}</ListGroup.Item>
        })}
      </ListGroup>
      <Button className='w-100 rounded-0' style={{height: '10%'}} onClick={onAddFriend}>Add Friend</Button>
    </>
  )
}

export default Friends