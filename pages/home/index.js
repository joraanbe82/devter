import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import useUSer from 'hooks/useUser'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUSer()

  useEffect(() => {
    user &&
      fetch('http://localhost:3000/api/statuses/home_timeline')
        .then(res => res.json())
        .then(setTimeline)
  }, [user])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(devit => {
            return (
              <Devit
                avatar={devit.avatar}
                key={devit.id}
                message={devit.message}
                username={devit.username}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background-color: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
