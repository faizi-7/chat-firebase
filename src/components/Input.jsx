import React, { useContext, useState } from 'react'
import Attach from '../assets/images/attach.png'
import AddImg from '../assets/images/img.png'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Input = () => {
  const [text, setText]= useState("")
  const [img, setImg]= useState(null)

  const {currentUser}= useContext(AuthContext)
  const {data}= useContext(ChatContext)

  const handleSend= async()=> {
    if(img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed', 
        (snap) => console.log("received update"),
        (err) => {
          setErr(true)
          console.log("Error Occured",err)
        }, 
        async () => {
          const fileUrl= await getDownloadURL(uploadTask.snapshot.ref)
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              img: fileUrl,
              senderId: currentUser.uid,
              date: Timestamp.now()
            })
          })
      })


    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    setText("")
    setImg(null)


  }


  return (
    <div className="input">
      <input type='text' placeholder='Type Something...' onChange={(e)=> setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={Attach}/>
        <input type="file" id='file' style={{display: 'none'} } onChange={(e)=> setImg(e.target.files[0])} />
        <label htmlFor='file'><img src={AddImg} alt="" /></label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input