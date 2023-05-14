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

import { firestore } from '@/libs/firebase';

// Timestamp
export async function addNewChannel(newChannel: string) {
	try {
		if (!newChannel) {
			return;
		}

		const newDoc = await setDoc(doc(firestore, 'rooms', uuid()), {
			name: newChannel,
		});
		// console.log('newDoc: ', newDoc);
	} catch (error) {
		console.log('error: ', error);
	}
}

type tChannelData = {
	name: string;
};

export interface iChannel {
	id: string;
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
