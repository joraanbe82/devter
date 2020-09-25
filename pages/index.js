import { useEffect, useState } from 'react'

import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Github from 'components/Icons/Github'
import Logo from 'components/Icons/Logo'

import { loginWithGithub, onAuthStateChanged } from 'firebase/client'

import { colors } from '../styles/theme'

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGithub()
      .then(user => {
        setUser({ user })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <AppLayout>
        <section>
          <Logo width='100' />
          <h1>Devter</h1>
          <h2>Talk about development with developers 👨👩‍🦰</h2>

          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <Github fill='#fff' width={24} height={24} />
                Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  withText
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
                {/* <strong>{user.username}</strong> */}
              </div>
            )}
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
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
      <style jsx global>{``}</style>
    </>
  )
}
