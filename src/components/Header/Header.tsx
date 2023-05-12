import {
	AccessTime as AccessTimeIcon,
	Search as SearchIcon,
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
				</HeaderSearch>
				{/* header right */}
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

	> svg {
		margin-left: auto;
		margin-right: 2rem;
	}
`;

const HeaderSearch = styled.div``;

const HeaderAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}
`;
