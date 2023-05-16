import {
	getDocs,
	collection,
	addDoc,
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

		const newDoc = await addDoc(collection(firestore, 'rooms'), {
			name: newChannel,
		});

		return newDoc;
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

		return channels;
	} catch (error) {
		console.log('error: ', error);
	}
}

export async function getChannelOnId(id: string) {
	try {
		console.log('id firestore getChannelOnId: ', id);
		const q = query(
			collection(firestore, 'rooms'),
			where('__name__', '==', id)
		);

		const querySnapshot = await getDocs(q);

		const channels: [] | iChannel[] = [];
		querySnapshot.forEach((doc) => {
			channels.push({
				id: doc.id as string,
				data: doc.data() as tChannelData,
			});
		});

		return channels[0];
	} catch (error) {
		console.log('error: ', error);
	}
}

export interface iAddMessageInChannel {
	id: string;
	message: string;
	user: string;
	userImage: string;
}

export async function addMessageToChannel({
	id,
	message,
	user,
	userImage,
}: iAddMessageInChannel) {
	try {
		const messageColRef = collection(firestore, 'rooms', id, 'messages');

		const newDoc = await addDoc(messageColRef, {
			message,
			user,
			userImage,
			timestamp: serverTimestamp(),
		});

		return newDoc;
	} catch (error) {
		console.log('error: ', error);
	}
}

export interface iMessageInChannel {
	id: string;
	data: iAddMessageInChannel & {
		timestamp: Timestamp;
	};
}

export async function getMessagesInChat(id: string) {
	try {
		const q = query(
			collection(firestore, 'rooms', id, 'messages'),
			orderBy('timestamp', 'asc')
		);

		const querySnapshot = await getDocs(q);

		const msgs: [] | iMessageInChannel[] = [];

		querySnapshot.forEach((doc) => {
			msgs.push({
				id: doc.id,
				data: doc.data(),
			});
		});

		return msgs;
	} catch (error) {
		console.log('error: ', error);
	}
}
