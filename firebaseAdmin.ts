import * as admin from 'firebase-admin';
// const serviceAccount = require('./sih-super-set-dev-firebase-adminsdk-ayuh1-1ee1709ed8.json'); 
const serviceAccount = require('/etc/secrets/sih-super-set-dev-firebase-adminsdk-ayuh1-1ee1709ed8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


export { admin, db };
