import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// const admin = await import('firebase-admin');
// import admin from 'firebase-admin/';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,

	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	databaseURL: import.meta.env.DATABASE_URL,

	projectId: import.meta.env.VITE_PROJECT_ID,

	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,

	appId: import.meta.env.VITE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const googleAuthProvider = new GoogleAuthProvider();

/* export const firebaseAdmin = () => {
	admin.initializeApp();

	return admin;
}; */
/* admin.initializeApp();

export { admin }; */
// export { db, auth };
