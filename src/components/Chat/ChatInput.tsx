import { FC, SyntheticEvent, useRef } from 'react';

import { styled } from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChannelsData } from '@/hooks/data/useChannelsData';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/userSlice';

interface ChatInputProps {
	name: string;
	id: string;
}

interface iFormValues {
	message: string;
}

const ChatInput: FC<ChatInputProps> = ({ name, id }: ChatInputProps) => {
	const { mutationAddMessageToChannel } = useChannelsData(id);

	const user = useSelector(selectUser);

	const formRef = useRef<HTMLFormElement>(null);
	const { handleSubmit, register } = useForm<iFormValues>();
	const onSubmit: SubmitHandler<iFormValues> = ({ message }) => {
		mutationAddMessageToChannel.mutate({
			message,
			id,
			user: user?.displayName as string,
			userImage: user?.photoURL as string,
		});

		formRef?.current?.reset();
	};

	return (
		<ChatInputContainer>
			<form
				onSubmit={(event: SyntheticEvent) => {
					if (!id) return;
					handleSubmit(onSubmit)(event);
				}}
				ref={formRef}
			>
				<input
					{...register('message', {
						required: 'Message is required',
					})}
					placeholder={`Message #${name}`}
				/>
			</form>
		</ChatInputContainer>
	);
};
export default ChatInput;

const ChatInputContainer = styled.div`
	position: fixed;
	inset: auto 0 2rem min(260px, 30%);

	margin-inline: auto;

	z-index: 10;

	--px-input: 1.25rem;

	> form {
		position: relative;
		margin-inline: auto;
		width: 60%;

		display: flex;
		justify-content: center;
	}

	> form > input {
		width: 100%;

		padding: var(--px-input);

		background-color: white;
		border: 1px solid lightgrey;
		border-radius: 1.25rem;
	}

	> form > small {
		color: red;
		position: absolute;
		bottom: 0.25rem;
		left: var(--px-input);
	}
`;
