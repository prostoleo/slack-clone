import { iLocalUser } from '@/hooks/useAuth';
import {
	createSlice,
	createSelector,
	// createDraftSafeSelector,
} from '@reduxjs/toolkit';
import { RootState } from '..';
// import { UserCredential } from 'firebase/auth';

interface iUserState {
	user: null | iLocalUser;
}

const initialState: iUserState = {
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},

		logout: (state) => {
			state.user = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const selectSelf = (state: RootState) => state.user;

export const selectUser = createSelector(
	(state: RootState) => state.user.user,
	(user) => user
);

export default userSlice.reducer;
