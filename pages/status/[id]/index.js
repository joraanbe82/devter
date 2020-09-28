import Devit from 'components/Devit'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'Zn5E43SzPWzj2lpE9vMW' } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(context) {
//   // params, req, res, query
//   const { params, res } = context
//   const { id } = params

//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props: props }
//   }
//   if (res) {
//     res.writeHead(301, { Location: '/home' }).end()
//   }
// }

/* el getInitialProps (deprecated) tiene que ser una propiedad estatica de la
función o clases (nombre del componet.getInitalProps), se va a ejecutar 
siempre en el servidor y tb en el cliente cuando pasa de una página a otra */

// DevitPage.getInitialProps = async context => {
//   const { query, res } = context
//   const { id } = query

//   return fetch(`http://localhost:3000/api/devits/${id}`).then(apiResponse => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(301, { Location: '/home' }).end()
//     }
//   })
// }
