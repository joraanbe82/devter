import * as firebase from 'firebase'
import { useCallback } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyBCd7gjVOMo6uSBt4lf_PhYPmTGAe39-tI',
  authDomain: 'devter-df43a.firebaseapp.com',
  databaseURL: 'https://devter-df43a.firebaseio.com',
  projectId: 'devter-df43a',
  storageBucket: 'devter-df43a.appspot.com',
  messagingSenderId: '854435216698',
  appId: '1:854435216698:web:ac6e472806c92ae23a2403',
  measurementId: 'G-CYE5NQHY1T',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = user => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = async () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    img,
    likesCount: 0,
    sharedCount: 0,
    userId,
    userName,
  })
}

const mapDevitFromFirebaseToDevitObject = doc => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevirs = callback => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(doc => mapDevitFromFirebaseToDevitObject(doc))
      callback(newDevits)
    })
}

// export const fetchLatestDevits = async () => {
//   return db
//     .collection('devits')
//     .orderBy('createdAt', 'desc')
//     .get()
//     .then(({ docs }) => {
//       return docs.map(mapDevitFromFirebaseToDevitObject)
//     })
// }

export const uploadImage = file => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
