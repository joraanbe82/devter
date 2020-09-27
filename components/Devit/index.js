import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit({
  avatar,
  userName,
  img,
  content,
  createdAt,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  // const handleArticleClick = e => {
  //   e.preventDefault()
  //   router.push('/status/[id]', `/status/${id}`)
  // }
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
          </header>

          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          margin-right: 10px;
        }

        time {
          color: #555;
          font-size: 14px;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  )
}
