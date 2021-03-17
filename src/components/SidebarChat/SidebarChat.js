import React, {useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import db from '../firebase'
import { Link } from 'react-router-dom'

const SidebarChat = ({ addNewChat, id, name }) => {
    const [seed, setSeed] = useState('')
    const [lastMessage, setLastMessage] = useState('')
    

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))

        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => setLastMessage(
                    snapshot.docs.map((doc) => doc.data())
                ))
        }

    }, [id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")

        if (roomName) {
            // do stuff
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebar_chat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='sidebar_chatInfo'>
                    <h2>{name}</h2>
                    <p>{lastMessage[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
            <div className='sidebar_chat' onClick={createChat}>
                <h2>Add new Chat</h2>
            </div>
    )
}

export default SidebarChat;
