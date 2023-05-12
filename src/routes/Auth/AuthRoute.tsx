import { useEffect, type FC } from 'react';

import styles from './AuthRoute.module.scss';
import { Button } from '@mui/material';
// import { auth, googleAuthProvider } from '@/libs/firebase';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { login } from '@/store/user/userSlice';
import { useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';

const AuthRoute = () => {
	const { handleSignIn, user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	return (
		<>
			<div className={styles.login}>
				<div className={styles.login__container}>
					<img src="/gmail.svg" alt="" />
					<Button onClick={handleSignIn} variant="contained" color="primary">
						Login
					</Button>
				</div>
			</div>
		</>
	);
};
export default AuthRoute;
