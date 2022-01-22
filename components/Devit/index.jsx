import styles from './styles.module.css'
import Avatar from 'components/Avatar'

export default function Devit ( { avatar, username, message } ) {
  return (
    <article className={ styles.article } >
      <div>
        <Avatar src={ avatar } alt={ username } />
      </div>
      <section>
        <strong>{ username }</strong>
        <p className={ styles.p } >{ message }</p>
      </section>
    </article>
  )
}
