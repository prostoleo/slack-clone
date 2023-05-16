import useAuth from '@/hooks/useAuth';
import { Button } from '@mui/material';
// import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
// import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

const AuthRoute = () => {
	const { handleSignIn } = useAuth();
	// const navigate = useNavigate();

	/* useEnhancedEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]); */

	return (
		<>
			<AuthRouteScreen>
				<AuthContainer>
					<img src="/slack-new.png" alt="" />
					<Button
						onClick={handleSignIn}
						variant="contained"
						color="primary"
						type="submit"
					>
						Sign in with google
					</Button>
				</AuthContainer>
			</AuthRouteScreen>
		</>
	);
};
export default AuthRoute;

const AuthRouteScreen = styled.div`
	min-height: 100vh;

	display: grid;
	place-items: center;

	background-color: whitesmoke;
`;

const AuthContainer = styled.div`
	display: grid;
	justify-items: center;

	gap: 1rem;

	border-radius: 0.25rem;

	padding: min(50px, 4vw);
	background-color: white;

	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

	img {
		height: 150px;
		object-fit: contain;
	}

	button {
		margin-inline: auto;
	}
`;
