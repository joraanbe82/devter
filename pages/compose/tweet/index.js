import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { useState } from 'react'

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState('')

  const handleChange = event => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmmit = () => {
    event.preventDefault()
  }
  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmmit}>
          <textarea
            onChange={handleChange}
            placeholder='¿Qué está pasando?'
          ></textarea>
          <Button disabled={message.length === 0}>Devitear</Button>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
