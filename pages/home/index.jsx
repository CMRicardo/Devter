import { useState, useEffect } from 'react'
import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import styles from './styles.module.css'

export default function home () {
  const [timeline, setTimeline] = useState( [] )

  useEffect( () => {
    fetch( 'http://localhost:3000/api/statuses/home_timeline' ).then( res => res.json() ).then( setTimeline )
  }, [] )


  return <AppLayout>
    <header className={ styles.header } >
      <h1>Home</h1>
    </header>
    <section className={ styles.section } >
      {
        timeline.map( ( { avatar, message, username, id, } ) => (
          <Devit
            avatar={ avatar }
            id={ id }
            key={ id }
            message={ message }
            username={ username }
          /> )
        )
      }
    </section>
    <nav className={ styles.nav } >
      <p>nav</p>
    </nav>
  </AppLayout>
}
