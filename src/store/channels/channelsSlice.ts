import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { tChannelId } from '@/services/firebase';

interface iUserState {
	selectedChannel: null | tChannelId;
}

const initialState: iUserState = {
	selectedChannel: null,
};

export const channelsSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		selectChannelAction: (state, action) => {
			state.selectedChannel = action.payload;
		},
	},
});

export const { selectChannelAction } = channelsSlice.actions;

export const selectSelf = (state: RootState) => state.user;

export const selectSelectedChannel = createSelector(
	(state: RootState) => state.channels.selectedChannel,
	(selectedChannel) => selectedChannel
);

export default channelsSlice.reducer;
