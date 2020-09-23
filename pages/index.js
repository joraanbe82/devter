// import styles from '../styles/Home.module.css'
import Head from 'next/head' //Etiqueta especial HTML para SEO

import Link from 'next/link'
import AppLayout from '../components/AppLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devter 👾</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout>
        <h1>
          <a to='https://nextjs.org'>Devter</a>
        </h1>
        <nav>
          <Link href='/timeline'>Timeline</Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        a {
          color: #09f;
          text-decoration: none;
        }
        nav {
          font-size: 24px;
          text-align: center;
        }
      `}</style>
      <style jsx global>{`
        h1 {
          text-align: center;
          font-size: 48px;
        }
      `}</style>
    </>
  )
}
