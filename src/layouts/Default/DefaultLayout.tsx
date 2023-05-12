import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';

import styles from './DefaultLayout.module.scss';
import './default.css';

const DefaultLayout = () => {
	return (
		<>
			<Header />
			<div className={styles.appBody}>
				<Suspense fallback={<p>loading..</p>}>
					<Outlet />
				</Suspense>
			</div>
		</>
	);
};

export default DefaultLayout;
