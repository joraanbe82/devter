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

const mapUserFromFirebaseAuthToUser = user => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGithub = async () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
