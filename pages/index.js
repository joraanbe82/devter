// import styles from '../styles/Home.module.css'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import { colors } from '../styles/theme'
import Github from '../components/Icons/Github'

import { loginWithGithub } from '../firebase/client'
import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState(null)

  const handleClick = () => {
    loginWithGithub()
      .then(user => {
        const { avatar, username, url } = user

        setUser({ user })

        console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <AppLayout>
        <section>
          <img src='/devter-logo.png' alt='logo' />
          <h1>Devter</h1>
          <h2>Talk about development with developers 👨👩‍🦰</h2>

          <div>
            <Button onClick={handleClick}>
              <Github fill='#fff' width={24} height={24} />
              Login with Github
            </Button>
          </div>
        </section>
      </AppLayout>
      <style jsx>{`
        img {
          width: 120px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
      <style jsx global>{``}</style>
    </>
  )
}
