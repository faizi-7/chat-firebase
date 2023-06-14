import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const {setCurrentUser}= useContext(AuthContext);
  const [err, setErr]= useState(false)
  const handleSubmit= async (e)=> {
    e.preventDefault()
    const email= e.target[0].value
    const password= e.target[1].value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setCurrentUser(user)
    })
    .catch((error) => {
      setErr(error)
    });
    navigate("/")

  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className='logo'>Chat App</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Enter email'/>
          <input type='password' placeholder='Enter password'/>
          <button>Login</button>
        </form>
        <p>Don't have an account ? <Link to="/register">Register</Link></p>
        <span>{err && "Error Occured"}</span>
      </div>
    </div>
  )
}

export default Login