/*
Decidir de que manera se utilizaran las credenciales
de Firebase
*/

// usando texto plano
/*const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'auth-domain',
  databaseURL: 'database-url',
  projectId: 'project-id',
  storageBucket: 'storage-bucket',
  messagingSenderId: 'messaging-sender-id',
  appId: 'app-id'
}*/

// usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

export default firebaseConfig
