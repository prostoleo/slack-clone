import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/Default/DefaultLayout';
import { lazy } from 'react';
import App from '@/app/App';

const HomeRoute = lazy(() => import('@/routes/Home/HomeRoute.tsx'));
const AuthRoute = lazy(() => import('@/routes/Auth/AuthRoute.tsx'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<App>
				<DefaultLayout />
			</App>
		),
		children: [
			{
				path: '',
				index: true,

				element: <HomeRoute />,
			},
		],
	},
	{
		path: '/auth',
		element: (
			<App>
				<AuthRoute />
			</App>
		),
	},
]);
