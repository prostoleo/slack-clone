import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancerLogOnlyInProduction } from '@redux-devtools/extension';

import userReducer from './user/userSlice';
import channelsReducer from './channels/channelsSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		channels: channelsReducer,
	},
	// devToolsEnhancerLogOnlyInProduction()
});

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
