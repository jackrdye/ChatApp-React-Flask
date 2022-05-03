import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { generateKeys, encryptText, decryptText } from '../Encryption/Keys.js'



function Home() {
  let publicKey;
  let privateKey;

  const text = 'hey there jack'

  // useEffect(async () => {
  //   ({ publicKey, privateKey } = await generateKeys())
  //   // console.log(stringToArrayBuffers(text))
  //   const encrpytedMessage = await encryptText(publicKey, text)
  //   console.log(encrpytedMessage)
  //   const decryptedMessage = await decryptText(privateKey, encrpytedMessage)
  //   console.log(decryptedMessage)

  // }, [])

  return (
    <>
      <div>
        <h3>Welcome to Encrypted Messaging Service (EMS)</h3>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/messages">Messages</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Home