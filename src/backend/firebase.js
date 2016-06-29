import firebase from 'firebase';

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const databaseURL = process.env.FIREBASE_DATABASE_URL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace('\\n', '\n');
const projectId = process.env.FIREBASE_PROJECT_ID;

firebase.initializeApp({
  serviceAccount: {
    projectId,
    clientEmail,
    privateKey,
  },
  databaseURL,
});

export default firebase;
