import { useChannelsData } from '@/hooks/data/useChannelsData';
import { selectSelectedChannel } from '@/store/channels/channelsSlice';
import { stringify } from '@/utils/formatters';
import {
	InfoOutlined,
	StarBorderOutlined as StarBorderOutlinedIcon,
} from '@mui/icons-material';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
// import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatProps {
	id: string;
}

const Chat: FC<ChatProps> = ({ id }) => {
	// const id = useSelector(selectSelectedChannel);
	// console.log('id: ', id);

	const {
		getChannelOnIdQuery: { data, isLoading, error },
	} = useChannelsData(id!);

	return (
		<>
			{!!data && (
				<ChatContainer>
					{/* <pre>{stringify(data)}</pre> */}
					<Header>
						<HeaderLeft>
							<h4>#{data.data.name}</h4>
							<StarBorderOutlinedIcon />
						</HeaderLeft>
						<HeaderRight>
							<p>
								<InfoOutlined /> Details
							</p>
						</HeaderRight>
					</Header>
					<ChatMessages>{/* list out all messages */}</ChatMessages>
					<ChatInput id={id} name={data.data.name} />
				</ChatContainer>
			)}
		</>
	);
};
export default Chat;

const ChatContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: auto;

	position: relative;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1.25rem;
	border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 1.25rem;
	height: fit-content;

	> h4 {
		display: flex;
		font-size: 1.25rem;
		font-weight: 700;

		/* line-height: 1; */

		text-transform: lowercase;
	}

	> svg {
		margin-top: 2px;
		display: block;
		font-size: 1.125rem;
	}
`;
const HeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 0.875rem;

		gap: 0.25rem;
	}

	> svg {
		font-size: 1rem;
	}
`;

const ChatMessages = styled.div``;
