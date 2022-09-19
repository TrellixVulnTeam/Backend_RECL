import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//var admin = require("firebase-admin");

var serviceAccount = require("./balk-es-firebase-adminsdk-trxwn-f59a74465d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://balk-es.firebaseio.com"
});


console.log("Base de datos conectada");

export const dbFirebase = admin.firestore();