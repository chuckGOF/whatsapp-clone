import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import {useParams} from 'react-router-dom'
import db from '../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider';

const Chat = () => {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()


    useEffect(() => {

        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(
                    snapshot.data().name
                ))
            db.collection('rooms')
                .doc(roomId).collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => setMessages(
                    snapshot.docs.map((doc) => doc.data())
                ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (event) => {
        event.preventDefault();
        console.log('You typed >>>', input)
        db.collection('rooms').doc(roomId).collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setInput('')
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>last seen{' '}{ new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((message) => (
                <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                </p>
                ))}
            </div>


            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input
                        type='text' placeholder='Type a message'
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <button type='submit' onClick={sendMessage} >Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;