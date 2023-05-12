import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancerLogOnlyInProduction } from '@redux-devtools/extension';

import mailReducer from './mail/mailSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
	reducer: {
		mail: mailReducer,
		user: userReducer,
	},
	// devToolsEnhancerLogOnlyInProduction()
});

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
