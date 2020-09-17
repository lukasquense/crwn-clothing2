import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvUQg_ZWwt7RhRrS-g0KKu6KZ8sLPxVLw",
    authDomain: "crwn-db-eb26e.firebaseapp.com",
    databaseURL: "https://crwn-db-eb26e.firebaseio.com",
    projectId: "crwn-db-eb26e",
    storageBucket: "crwn-db-eb26e.appspot.com",
    messagingSenderId: "315371977648",
    appId: "1:315371977648:web:d2b5146f22f6f871363475",
    measurementId: "G-K5N8YE8T15"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => 
{
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email, 
        createdAt,
        ...additionalData
      })
    } catch (error) {
    console.log('error crearting user', error.message)
    }
  }  

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 