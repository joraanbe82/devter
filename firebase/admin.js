const admin = require('firebase-admin')

const serviceAccount = require('./firebase-keys.json')

//este try es por firebase...para que no de error de que ya esta inicializado
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://devter-df43a.firebaseio.com',
  })
} catch (e) {}

export const firestore = admin.firestore()
