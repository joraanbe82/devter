import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

import { addDevit, uploadImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState('')

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      let onProgress = () => {}
      let onError = () => {}
      let onComplete = () => {
        console.log('onComplete')
        task.snapshot.ref.getDownloadURL().then(imgUrl => {
          setImgURL(imgUrl)
        })
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = event => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
    })
      .then(() => {
        router.push('/home')
      })
      .catch(err => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = event => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = event => {
    event.preventDefault()

    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = event => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = event.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)

    console.log(event)
    console.log(event.dataTransfer.files[0])
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un devit / Devter</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder='¿Qué está pasando?'
          ></textarea>
          {imgURL && (
            <section>
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        button {
          background: rgb(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          position: absolute;
          right: 15px;
          top: 15px;
        }

        form {
          margin: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        section {
          position: relative;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '0'};
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
