import Head from 'next/head' //Etiqueta especial HTML para SEO

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>Devter 👾</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>{children}</main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}
