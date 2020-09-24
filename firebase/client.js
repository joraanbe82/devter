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

!firebase.app.length && firebase.initializeApp(firebaseConfig)

export const loginWithGithub = () => {
  const githbuProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githbuProvider)
    .then(user => {
      const { aditionalUserInfo } = user
      const { username, profile } = aditionalUserInfo
      const { avatar_url, blog } = profile
      return {
        avatar: avatar_url,
        username,
        url: blog,
      }
    })
}
