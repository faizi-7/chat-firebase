import React, { useContext } from 'react'
import More from '../assets/images/more.png'
import AddPeople from '../assets/images/add.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img src= {AddPeople}/>
          <img src= {More}/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat