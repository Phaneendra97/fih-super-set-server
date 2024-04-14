const admin = require('firebase-admin');
const serviceAccount = require('./sih-super-set-dev-firebase-adminsdk-ayuh1-1ee1709ed8.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


export default db;
