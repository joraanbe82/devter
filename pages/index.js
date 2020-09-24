// import styles from '../styles/Home.module.css'

import Link from 'next/link'
import AppLayout from '../components/AppLayout'

export default function Home() {
  return (
    <>
      <AppLayout>
        <h1>
          <a to='https://nextjs.org'>Devter</a>
        </h1>
      </AppLayout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  )
}
