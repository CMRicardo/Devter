import { useState, useEffect } from 'react'
import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import styles from './styles.module.css'
import useUser from 'hooks/useUser'
import { fetchLatestDevits } from '../../firebase/client'

export default function home () {
  const [timeline, setTimeline] = useState( [] )
  const user = useUser()

  useEffect( () => {
    user && fetchLatestDevits().then( setTimeline )
  }, [user] )


  return <AppLayout>
    <header className={ styles.header } >
      <h1>Home</h1>
    </header>
    <section className={ styles.section } >
      {
        timeline.map( ( { avatar, content, userName, id, userId, createdAt } ) => (
          <Devit
            avatar={ avatar }
            content={ content }
            createdAt={ createdAt }
            id={ id }
            key={ id }
            userId={ userId }
            userName={ userName }
          /> )
        )
      }
    </section>
    <nav className={ styles.nav } >
      <p>nav</p>
    </nav>
  </AppLayout>
}
