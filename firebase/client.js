import * as firebase from 'firebase'

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
    username: displayName,
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

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}
