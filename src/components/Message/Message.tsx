import { iMessageInChannel } from '@/services/firebase';
import { formatDate } from '@/utils/formatters';
import type { FC } from 'react';
import { styled } from 'styled-components';

interface MessageProps extends iMessageInChannel {}

const Message: FC<MessageProps> = ({
	data: { message, user, userImage, timestamp },
}: MessageProps) => {
	return (
		<>
			<MessageContainer>
				<div>
					<img src={userImage} alt={`avatar of user ${user}`} />
					<span>{user}</span>
					<span>{formatDate(timestamp.toDate())}</span>
				</div>
				<p>{message}</p>
			</MessageContainer>
		</>
	);
};
export default Message;

const MessageContainer = styled.div`
	> div {
		display: inline-flex;
		align-items: center;

		gap: 0.5rem;

		> span {
			font-weight: 700;
		}

		> img {
			display: block;

			width: 3rem;
			height: 3rem;
			aspect-ratio: 1 / 1;

			object-fit: cover;

			border-radius: 50%;
		}
	}
`;
