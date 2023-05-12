import {
	createSlice,
	createSelector,
	// createDraftSafeSelector,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { iSendEmail } from '@/components/Email/SendEmail/SendEmail';
import { iSendEmailExt } from '@/services/firebase';
// import { UserCredential } from 'firebase/auth';

interface iMailState {
	// mail: null | unknown;
	selectedMail: null | iSendEmailExt;
	sendMessageIsOpen: boolean;
}

const initialState: iMailState = {
	// mail: null,
	selectedMail: null,
	sendMessageIsOpen: false,
};

export const mailSlice = createSlice({
	name: 'mail',
	initialState,
	// } satisfies iMailState,
	reducers: {
		selectMail: (state, action) => {
			state.selectedMail = action.payload;
		},

		openSendMessage: (state) => {
			state.sendMessageIsOpen = true;
		},
		closeSendMessage: (state) => {
			state.sendMessageIsOpen = false;
		},
	},
});

export const { selectMail, openSendMessage, closeSendMessage } =
	mailSlice.actions;

export const selectSelf = (state: iMailState) => state;

export const sendMessageIsOpen = (state: RootState) =>
	state.mail.sendMessageIsOpen;
/* export const selectSendMessageIsOpen = (state: RootState) =>
	state.mail.sendMessageIsOpen; */

export const selectSendMessageIsOpen = createSelector(
	(state: RootState) => state.mail.sendMessageIsOpen,
	(sendMessageIsOpen) => sendMessageIsOpen
);
export const selectSelectedMail = createSelector(
	(state: RootState) => state.mail.selectedMail,
	(selectedMail) => selectedMail
);

export default mailSlice.reducer;
