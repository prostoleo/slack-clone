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
	serverTimestamp,
} from 'firebase/firestore';

import { firestore } from '@/libs/firebase';

// Timestamp
export async function addNewChannel(newChannel: string) {
	try {
		if (!newChannel) {
			return;
		}

		/* const newDoc = await setDoc(doc(firestore, 'rooms', uuid()), {
			name: newChannel,
		}); */
		const newDoc = await addDoc(collection(firestore, 'rooms'), {
			name: newChannel,
		});
		// console.log('newDoc: ', newDoc);
	} catch (error) {
		console.log('error: ', error);
	}
}

export type tChannelData = {
	name: string;
};

export type tChannelId = string;

export interface iChannel {
	id: tChannelId;
	data: tChannelData;
}

export async function getChannels() {
	try {
		const q = query(collection(firestore, 'rooms'), orderBy('name', 'asc'));

		const querySnapshot = await getDocs(q);

		const channels: [] | iChannel[] = [];
		querySnapshot.forEach((doc) => {
			channels.push({
				id: doc.id as string,
				data: doc.data() as tChannelData,
			});
		});

		console.log('channels: ', channels);

		return channels;
	} catch (error) {}
}

export async function getChannelOnId(id: string) {
	try {
		console.log('id firestore getChannelOnId: ', id);
		const q = query(
			collection(firestore, 'rooms'),
			where('__name__', '==', id)
		);

		const querySnapshot = await getDocs(q);
		console.log('querySnapshot: ', querySnapshot);

		const channels: [] | iChannel[] = [];
		querySnapshot.forEach((doc) => {
			channels.push({
				id: doc.id as string,
				data: doc.data() as tChannelData,
			});
		});

		console.log('channels: ', channels);

		return channels[0];
	} catch (error) {}
}

export interface iAddMessageToChannel {
	id: string;
	message: string;
	user: string;
}

export async function addMessageToChannel({
	id,
	message,
	user,
}: iAddMessageToChannel) {
	try {
		/* const newDoc = await setDoc(doc(firestore, 'rooms', id, 'messages'), {
			message,
			timestamp: serverTimestamp(),
		}); */
		/* const roomDocRef = doc(collection(firestore, 'rooms', id, 'messages')); */
		/* const newDoc = await addDoc(roomDocRef, {
			message,
			timestamp: serverTimestamp(),
		}); */

		const messageColRef = collection(firestore, 'rooms', id, 'messages');

		const newDoc = await addDoc(messageColRef, {
			message,
			user,
			timestamp: serverTimestamp(),
		});

		console.log('newDoc: ', newDoc);

		return newDoc;
	} catch (error) {
		console.log('error: ', error);
	}
}
