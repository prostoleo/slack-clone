import {
	AccessTime as AccessTimeIcon,
	Search as SearchIcon,
	HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import type { FC } from 'react';
import { styled } from 'styled-components';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
	return (
		<>
			<HeaderContainer>
				{/* header left */}
				<HeaderLeft>
					<HeaderAvatar
					//todo add onClick
					/>
					<AccessTimeIcon />
				</HeaderLeft>
				{/* header search */}
				<HeaderSearch>
					<SearchIcon />
					<input type="search" placeholder="Search our slack" />
				</HeaderSearch>
				{/* header right */}
				<HeaderRight>
					<HelpOutlineIcon />
				</HeaderRight>
			</HeaderContainer>
		</>
	);
};
export default Header;

const HeaderContainer = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	position: sticky;
	top: 0;

	width: 100%;

	padding-block: 0.75rem;

	background-color: var(--slack-color);
`;

const HeaderLeft = styled.div`
	flex: 0.3;

	display: flex;
	align-items: center;
	margin-left: 1.25rem;

	color: white;

	> svg {
		margin-left: auto;
		margin-right: 2rem;
	}
`;

const HeaderSearch = styled.div`
	flex: 0.4;

	display: flex;
	align-items: center;
	justify-content: center;

	padding-inline: 5%;
	border-radius: 0.5rem;

	text-align: center;
	color: white;

	border: 1px solid gray;

	input {
		padding: 0.5em;
		background-color: transparent;

		min-width: 25vw;
	}
`;

const HeaderAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}
`;

const HeaderRight = styled.div`
	flex: 0.3;

	display: flex;
	justify-content: flex-end;

	color: white;

	svg {
		margin-left: auto;
		margin-right: 1.25rem;
	}
`;
