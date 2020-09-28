import Devit from 'components/Devit'

export default function DevitPage(props) {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

/* el getInitialProps (deprecated) tiene que ser una propiedad estatica de la
función o clases (nombre del componet.getInitalProps), se va a ejecutar 
siempre en el servidor y tb en el cliente cuando pasa de una página a otra */

DevitPage.getInitialProps = async context => {
  const { query } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/devits/${id}`).then(apiResponse => {
    if (apiResponse.ok) return apiResponse.json()
  })
}
