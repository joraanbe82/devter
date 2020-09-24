import Head from 'next/head' //Etiqueta especial HTML para SEO

import styles, { globalStyles } from './styles'

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>Devter 👾</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <main>{children}</main>
      </div>

      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}
