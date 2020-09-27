import { useEffect, useState } from 'react'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import Github from 'components/Icons/Github'
import Logo from 'components/Icons/Logo'

import { loginWithGithub } from 'firebase/client'
import { useRouter } from 'next/router'
import { colors } from '../styles/theme'
import useUSer, { USER_STATES } from 'hooks/useUser'

export default function Home() {
  const user = useUSer()

  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGithub().catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>Devter 👾</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout>
        <section>
          <Logo width='100' />
          <h1>Devter</h1>
          <h2>Talk about development with developers 👨👩‍🦰</h2>

          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <Github fill='#fff' width={24} height={24} />
                Login with Github
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && (
              <div>
                <img src='/spinner.gif' />
                Loading...
              </div>
            )}
          </div>
        </section>
      </AppLayout>
      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
          align-items: center;
          display: flex;
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
          text-align: center;
        }
      `}</style>
      <style jsx global>{``}</style>
    </>
  )
}
