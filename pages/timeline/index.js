import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function Timeline({ userName }) {
  return (
    <>
      <AppLayout>
        <h1>This is the timeline of {userName}</h1>
        <Link href='/'>Go home</Link>
      </AppLayout>
      <style jsx>{`
        h1 {
          font-size: 36px;
          color: red;
        }
      `}</style>
    </>
  )
}

/*A los componentes de tipo página, nos ofrece una forma de que en el server podamos añadirle
las props que va a utilizar el componente, nos permite hacer un fetching de 
datos y pasarlos como props al componente. Como nota decir que el getInitialProps
está en deprecated y se recomiendo usar getStaticProps o getServerSideProps
Este método se ejecuta en el servidor */

Timeline.getInitialProps = async () => {
  return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
    .then(response => {
      console.log(response)
      const { userName } = response
      return { userName }
    })
}

/** El objeto que devolvemos en el getInitialProps (en este ejemplo el return userName
 * son las props que va a recibir el componente, importante) */
