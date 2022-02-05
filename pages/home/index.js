import { useState, useEffect } from "react"
import AppLayout from "components/AppLayout"
import Devit from "components/Devit"
import styles from "./styles.module.css"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"
import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Head from "next/head"

export default function home() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <AppLayout>
      <Head>
        <title>Home / Devter</title>
      </Head>
      <header className={styles.header}>
        <h1>Home</h1>
      </header>
      <section className={styles.section}>
        {timeline.map(
          ({ avatar, content, userName, id, img, userId, createdAt }) => (
            <Devit
              avatar={avatar}
              content={content}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              userId={userId}
              userName={userName}
            />
          )
        )}
      </section>
      <nav className={styles.nav}>
        <Link href="/home">
          <a>
            <Home width={32} height={32} />
          </a>
        </Link>
        <Link href="/compose/devit">
          <a>
            <Search width={32} height={32} />
          </a>
        </Link>
        <Link href="/compose/devit">
          <a>
            <Create width={32} height={32} />
          </a>
        </Link>
      </nav>
    </AppLayout>
  )
}
