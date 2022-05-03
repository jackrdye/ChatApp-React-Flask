const Buffer = require("buffer").Buffer

export const generateKeys = async () => {
    let { publicKey, privateKey } = await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
        }, 
        true, 
        ["encrypt", "decrypt"]
    )

    let keys = await window.crypto.subtle.generateKey({
        name: "RSA-PSS",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {name: "SHA-256"}
        },
        true,
        ["sign", "verify"]
    )
    const signKey = keys.privateKey
    const verifyKey = keys.publicKey

    return [ publicKey, privateKey, signKey, verifyKey ]
}

export const encryptText = async (publicKey,  message) => {
    // var uint16array = await str2ab(message)
    const encodedText = new TextEncoder().encode(message)
    const result = await window.crypto.subtle.encrypt({
        name: "RSA-OAEP"
    }, 
    publicKey,
    encodedText // Must be array buffer
    ); // returns an array buffer of encrypted data

    const uintArray = new Uint8Array(result)
    const string = String.fromCharCode.apply(null, uintArray)
    const base64Data = btoa(string)
    return base64Data
}

export const decryptText = async (privateKey, encryptedData) => {
    // const uint16array = await str2ab(encryptedMessage)
    // try {
        // console.log(privateKey, encryptedData)
        const string = atob(encryptedData)
        const uintArray = new Uint8Array(
            [...string].map((char) => char.charCodeAt(0))
        )
        const decryptedData = await window.crypto.subtle.decrypt({
            name: "RSA-OAEP"
        }, 
        privateKey,
        uintArray
        );

        return new TextDecoder().decode(decryptedData)
    // } catch (error) {
    //     return `error decrypting message: ${error}`
    // }
    
}

export const signText = async (signKey, message) => {
    // var uint16array = await str2ab(message)
    const encodedText = new TextEncoder().encode(message)
    const result =  await window.crypto.subtle.sign(
        {
            name: "RSA-PSS",
            saltLength: 128
        },
        signKey,
        encodedText
    ) // returns an Array buffer containing the signature
    console.log(result)

    const uintArray = new Uint8Array(result)
    const string = String.fromCharCode.apply(null, uintArray)
    const base64Data = btoa(string)
    // console.log(base64Data)
    return base64Data
    // return ab2str(result)
}

export const verifyText = async (verifyKey, message, signature) => {
    // var uint16array = await str2ab(message)
    // var signatureBuff = await str2ab(signature)
    try {
        const encodedText = new TextEncoder().encode(message)
        // const string = atob(encryptedData)
        // const uintArray = new Uint8Array(
        //     [...string].map((char) => char.charCodeAt(0))
        // )
        // const stringSignature = atob(signature)
        // const uintArraySignature = new Uint8Array(
        //     [...stringSignature].map((char) => char.charCodeAt(0))
        // )
        console.log(signature)
        // const encodedSignature = new TextEncoder().encode(signature).buffer
        const FromBase64 = (str) => {
            return atob(str).split('').map(function (c) { return c.charCodeAt(0); });
        }
        // const signatureBuff = Uint8Array.from(atob(message), c => c.charCodeAt(0))
        // const signatureBuff = Buffer.from(FromBase64(message))
        const signatureBuff = Buffer.from(FromBase64(signature)).buffer
        console.log(signatureBuff)
        // console.log(signatureBuff.buffer)

        // const string = atob(signature)
        // const uintArray = new Uint8Array(
        //     [...string].map((char) => char.charCodeAt(0))
        // )

        const result = await window.crypto.subtle.verify(
            {
                name: "RSA-PSS",
                saltLength: 128
            },
            verifyKey, 
            signatureBuff,
            encodedText //message buff
        ) // Returns a boolean if signature matches 
        return result
    } catch (error) {
        return `error verifying message: ${error}`
    }
}

export const exportKey = async (publicKey) => {
    return await window.crypto.subtle.exportKey(
        "jwk", 
        publicKey
    )
}

export const importPublicKey = async (publicKey) => {
    return await window.crypto.subtle.importKey(
        "jwk",
        publicKey,
        {
            name: "RSA-OAEP",
            hash: {name: "SHA-256"},
        },
        false,
        ["encrypt"]
    )
}

export const importVerifyKey = async (verifyKey) => {
    return await window.crypto.subtle.importKey(
        "jwk", 
        verifyKey,
        {
            name: "RSA-PSS",
            hash: {name: "SHA-256"}
        },
        false,
        ["verify"]
    )
}








function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
    }
    return buf;
}









// // const exportKey = crypto.subtle.exportKey("jwk", )

// const test = async () => {
//     const {publicKey, privateKey} = await generateKey()
//     console.log("hi")
//     // console.log(subtle.exportKey("raw", publicKey))
// }

// test()
// let crypto

//     crypto = import('crypto')


// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//     modulusLength: 2048
// })

// console.log(publicKey, privateKey)

