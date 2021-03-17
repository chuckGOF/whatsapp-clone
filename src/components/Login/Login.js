import React from 'react'
import { Button } from '@material-ui/core'
import  {auth, provider}  from '../firebase'
import './Login.css'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'

const Login = () => {

    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((resp) => {
                // console.log(resp)
                dispatch({
                    type: actionTypes.SET_USER,
                    user: resp.user
                })
            })
            .catch(err => alert.apply(err.message))
    }

    return (
        <div className='login'>
            <div className='login_container'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
                    alt='whatsapp'
                />

                <div className='login_text'>
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login;