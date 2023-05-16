import { useChannelsData } from '@/hooks/data/useChannelsData';
import {
	InfoOutlined,
	StarBorderOutlined as StarBorderOutlinedIcon,
} from '@mui/icons-material';
import { useRef, type FC } from 'react';
import { styled } from 'styled-components';
import ChatInput from './ChatInput';
import Message from '@/components/Message/Message';
import { useScrollIntoView } from '@/hooks/useScrollIntoView';

interface ChatProps {
	id: string;
}

const Chat: FC<ChatProps> = ({ id }) => {
	const {
		getChannelOnIdQuery: { data, isLoading },
		getMessagesInChatQuery: { data: messages, isLoading: isLoadingMsgs },
	} = useChannelsData(id!);

	const ChatContainerRef = useRef<HTMLDivElement>(null);
	const chatBottomRef = useRef<HTMLDivElement>(null);

	//* scrollToBottom of messages
	useScrollIntoView(chatBottomRef, [id, isLoading, isLoadingMsgs]);

	return (
		<>
			{!!data && (
				<ChatContainer id="chat-container" ref={ChatContainerRef}>
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
					<ChatMessages>
						{!!messages &&
							messages?.map((msg) => {
								return <Message key={msg.id} {...msg} />;
							})}

						<ChatBottom id="chat-bottom" ref={chatBottomRef} />
					</ChatMessages>
					<ChatInput id={id} name={data.data.name} />
				</ChatContainer>
			)}
		</>
	);
};
export default Chat;

const ChatContainer = styled.div`
	--px: 1.25rem;
	width: 100%;
	height: 100%;

	position: relative;

	max-height: 93vh;
	overflow-y: auto;
`;

const Header = styled.header`
	position: sticky;

	top: 0;

	display: flex;
	justify-content: space-between;

	padding: var(--px);

	background-color: white;
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

const ChatMessages = styled.div`
	padding-inline: var(--px);

	> * {
		margin-top: 1.5rem;
	}

	> :nth-of-type(1) {
		margin-top: 0;
	}
`;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;
