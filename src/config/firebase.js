import * as firebase from 'firebase';
import * as c from './constants';
const geofire = require('geofire');

// Initialize Firebase
const config = {
    apiKey: c.FIREBASE_API_KEY,
    authDomain: c.FIREBASE_AUTH_DOMAIN,
    databaseURL: c.FIREBASE_DATABASE_URL,
    projectId: c.FIREBASE_PROJECT_ID,
    storageBucket: c.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export const geofireRef = new geofire(firebase.database().ref('geofire'));
export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = new firebase.storage();
export const fbAuthProvider = auth.FacebookAuthProvider;