import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import Button from 'components/Button'

import useUser from 'hooks/useUser'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { addDevit, uploadImage } from '../../../firebase/client'
import { getDownloadURL } from 'firebase/storage'

import styles from './styles.module.css'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}
const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet () {
  const router = useRouter()
  const user = useUser()
  const [message, setMessage] = useState( "" )
  const [status, setStatus] = useState( COMPOSE_STATES.USER_NOT_KNOWN )
  const [drag, setDrag] = useState( DRAG_IMAGES_STATES.NONE )
  const [task, setTask] = useState( null )
  const [imgURL, setImgURL] = useState( null )

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
      userName: user.username,
      img: imgURL
    } ).then( () => {
      router.push( '/home' )
    } ).catch( err => {
      setStatus( COMPOSE_STATES.ERROR )
      console.error( err )
    } )
  }

  useEffect( () => {
    if ( task ) {
      const onProgress = () => { }
      const onError = () => { }
      const onComplete = ( snapshot ) => {
        console.log( 'On complete' );
        getDownloadURL( task.snapshot.ref )
          .then( setImgURL )
      }
      task.on( 'state_changed',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task] )

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag( DRAG_IMAGES_STATES.DRAG_OVER )
  }
  const handleDragLeave = e => {
    e.preventDefault()
    setDrag( DRAG_IMAGES_STATES.NONE )
  }
  const handleDrop = e => {
    e.preventDefault()
    setDrag( DRAG_IMAGES_STATES.NONE )
    console.log( e.dataTransfer.files[0] )
    const file = e.dataTransfer.files[0]
    const task = uploadImage( file )
    setTask( task )
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return <><AppLayout>

    <Head>
      <title>Compose a devit / Devter</title>
    </Head>
    <section className='form-container' >
      { user && <section className='avatar-container' >
        <Avatar src={ user.avatar } />
      </section>
      }
      <form onSubmit={ handleSubmit } >
        <textarea className={ styles.textarea }
          placeholder="What's happening?"
          value={ message }
          onChange={ handleChange }
          onDragEnter={ handleDragEnter }
          onDragLeave={ handleDragLeave }
          onDrop={ handleDrop }
        />
        { imgURL && <section className='remove-container' >
          <button onClick={ () => setImgURL( null ) } >X</button>
          <img src={ imgURL } />
        </section> }
        <div className={ styles.div }>
          <Button disable={ isButtonDisabled } >Let&apos;s devit</Button>
        </div>
      </form>
    </section>
  </AppLayout>
    <style jsx >
      { `
      button{
        position: absolute;
        background: rgba(0,0,0,.3);
        border: 0;
        color: #fff;
        padding: .5rem 1rem;
        border-radius: 9999px;
        font-size: 1.2rem;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }
      .avatar-container {
        padding-top: 1rem;
        padding-left: 1rem;
      }
      .form-container {
        display: flex;
        align-items: flex-start;
      }
      .remove-container {
        position: relative;
      }
      textarea {
        border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER ? '3px dashed #09f' : '3px transparent dashed'};
      }
      form {
        margin: 10px;
      }
      img {
        border-radius: 10px;
        width: 100%;
      }
    `}
    </style>
  </>
}
