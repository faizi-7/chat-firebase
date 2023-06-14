import React, { useContext } from 'react'
import Profile from '../assets/images/gallery.png'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser}= useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={currentUser.photoURL} alt='name'/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=> signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar