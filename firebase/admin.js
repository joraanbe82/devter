const admin = require('firebase-admin')

const serviceAccount = require('./firebase-keys.json')

//este try es por firebase...para que no de error de que ya esta inicializado
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
} catch (e) {}

export const firestore = admin.firestore()
