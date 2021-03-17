import React, {useEffect, useState} from 'react'
import SidebarChat from '../SidebarChat/SidebarChat'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AddIcon from '@material-ui/icons/Add';
// import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
// import { SearchOutlined } from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import db from '../firebase'

import './Sidebar.css'
import { useStateValue } from '../../StateProvider';

const Sidebar = () => {
    const [rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue()
    
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

        return () => {
            unsubscribe()
        }
        
    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <AddIcon />
                    </IconButton>

                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchIcon />
                    <input placeholder='Search or start new chat' />
                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChat />
                {/* {/* <SidebarChat /> */}
                {rooms.map((room) => (
                    < SidebarChat key = { room.id } id = { room.id } name = { room.data.name } />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;