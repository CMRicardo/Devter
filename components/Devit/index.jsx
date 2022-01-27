import styles from './styles.module.css'
import Avatar from 'components/Avatar'

export default function Devit ( { avatar, userName, content, userId, createdAt } ) {
  return (
    <article className={ styles.article } >
      <div>
        <Avatar src={ avatar } alt={ userName } />
      </div>
      <section>
        <header>
          <strong>{ userName }</strong>
          <span> · </span>
          <time className={ styles.time } >{ createdAt }</time>
        </header>
        <p className={ styles.p } >{ content }</p>
      </section>
    </article>
  )
}
