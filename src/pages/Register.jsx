import React, { useState } from 'react'
import UploadImage from '../assets/images/gallery.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate= useNavigate();
  const [err, setErr]= useState(false)
  const handleSubmit= async (e)=> {
    e.preventDefault()
    const displayName = e.target[0].value
    const email= e.target[1].value
    const password= e.target[2].value
    const file= e.target[3].files[0]
    try {
      
      const res= await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snap) => console.log("received update"),
        (err) => {
          setErr(true)
          console.log("Error Occured",err)
        }, 
        async () => {
          const fileUrl= await getDownloadURL(uploadTask.snapshot.ref)
          await updateProfile(res.user, {
            displayName,
            photoURL: fileUrl,
          })
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: fileUrl,
          })
          await setDoc(doc(db, "userChats", res.user.uid), {})
          navigate("/")
        }
      );
    } catch(err) {
      console.log(err);
      setErr(true)
    }

  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className='logo'>Chat App</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter your name'/>
          <input type='email' placeholder='Enter email'/>
          <input type='password' placeholder='Enter password'/>
          <input style= {{display: 'none'}} type='file' id='file'/>
          <label htmlFor="file"><img src={UploadImage}/><span>Add an Avatar</span></label>
          <button>Register</button>
          {err && <span>Something went wrong!!</span>}
        </form>
        <p>Don't have an account ? <Link to="/login">Sign In</Link></p>

      </div>
    </div>
  )
}

export default Register