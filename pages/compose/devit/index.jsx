import AppLayout from 'components/AppLayout'
import Button from 'components/Button'

import useUser from 'hooks/useUser'
import { useRouter } from 'next/router'

import { useState } from 'react'
import { addDevit } from '../../../firebase/client'

import styles from './styles.module.css'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet () {
  const router = useRouter()
  const user = useUser()
  const [message, setMessage] = useState( "" )
  const [status, setStatus] = useState( COMPOSE_STATES.USER_NOT_KNOWN )

  const handleChange = ( event ) => {
    const { value } = event.target
    setMessage( value )
  }
  const handleSubmit = ( event ) => {
    event.preventDefault()
    setStatus( COMPOSE_STATES.LOADING )
    addDevit( {
      avatar: user.avatar,
      content: message,
      userId: user.id,
      userName: user.username
    } ).then( () => {
      router.push( '/home' )
    } ).catch( err => {
      setStatus( COMPOSE_STATES.ERROR )
      console.error( err )
    } )
  }
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return <AppLayout>
    <form onSubmit={ handleSubmit } >
      <textarea className={ styles.textarea }
        placeholder="What's happening?"
        value={ message }
        onChange={ handleChange }
      />
      <div className={ styles.div }>
        <Button disable={ isButtonDisabled } >Let&apos;s devit</Button>
      </div>
    </form>
  </AppLayout>
}
