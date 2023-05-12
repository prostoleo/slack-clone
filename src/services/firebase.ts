import { v4 as uuid } from 'uuid';

import {
	getDocs,
	collection,
	onSnapshot,
	addDoc,
	getFirestore,
	doc,
	setDoc,
	Timestamp,
	query,
	where,
	orderBy,
} from 'firebase/firestore';

// import admin from 'firebase/auth/';
// const {firebaseAdmin} = await import('@libs/firebase')
// import { getDatabase, ref, set } from 'firebase/database';

import { firestore } from '@/libs/firebase';
// import { PostProps } from '@/components/Post/Post';
import { iSendEmail } from '@/components/Email/SendEmail/SendEmail';

export interface iSendEmailExt extends iSendEmail {
	id: string;
	date: Timestamp;
}

// Timestamp

export async function fetchEmails() {
	const colRef = collection(firestore, 'emails');

	try {
		let emails = [] as iSendEmailExt[] | [];

		const q = query(colRef, orderBy('date', 'desc'));

		const unsubscribe = await getDocs(q).then((snapshot) => {
			// const unsubscribe = await (await getDocs(colRef)) ((snapshot) => {
			// let data = [];

			const data = snapshot.docs.forEach((doc) => {
				emails.push({
					...doc.data(),
					// emailId: doc.id,
				});
			});

			// posts
			// return data;
		});

		/* 	const sortedData = emails
			.slice()
			.sort((a, b) => b.date.toMillis() - a.date.toMillis()); */

		// return res;
		return {
			// emails: sortedData,
			emails,
			unsubscribe,
		};
		/* const d = await colRef.converter?.fromFirestore();
		console.log('d: ', d);

		const res = onSnapshot(colRef, (QuerySnapshot) => {
			const data = [];

			QuerySnapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			return data;
		});

		return res; */
	} catch (error) {
		console.log('error: ', error);
	}
}

export async function fetchEmailOnId(id: string) {
	const colRef = collection(firestore, 'emails');

	try {
		// let emails = [] as iSendEmailExt[] | [];
		let emails = [] as iSendEmailExt[] | null | [];

		const q = query(colRef, where('id', '==', id));

		const unsubscribe = await getDocs(q).then((snapshot) => {
			console.log('snapshot: ', snapshot);
			// snapshot.docs.forEach((doc) => {
			snapshot.forEach((doc) => {
				emails?.push(doc.data());
			});
		});

		/* const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, ' => ', doc.data());

			emails?.push(...doc.data());
		}); */

		console.log('emails: ', emails);
		// return res;
		return {
			email: emails[0],
			unsubscribe,
		};
	} catch (error) {
		console.log('error: ', error);
	}
}

export async function addEmail(emailData: iSendEmail) {
	try {
		const userId = Math.floor(Math.random() * 1000);

		// const email = doc(firestore, 'emails/' + userId);
		const email = doc(firestore, 'emails/' + userId);

		/* const docData = {
			message,
			de
		}; */

		setDoc(email, {
			id: uuid(),
			...emailData,
			date: Timestamp.fromDate(new Date()),
		});
	} catch (error) {
		console.log('error: ', error);
		throw error;
	}
}
