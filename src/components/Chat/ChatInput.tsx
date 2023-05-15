import { FC, SyntheticEvent, useRef } from 'react';

import { styled } from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChannelsData } from '@/hooks/data/useChannelsData';

interface ChatInputProps {
	name: string;
	id: string;
}

interface iFormValues {
	message: string;
}

const ChatInput: FC<ChatInputProps> = ({ name, id }: ChatInputProps) => {
	const { mutationAddMessageToChannel } = useChannelsData(id);

	const formRef = useRef<HTMLFormElement>(null);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<iFormValues>();
	const onSubmit: SubmitHandler<iFormValues> = ({ message }) => {
		mutationAddMessageToChannel.mutate({
			message,
			id,
			user: 'prostoleo.dev',
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
						// validate: (value) => value !== 'admin' || 'Nice try!',
					})}
					placeholder={`Message #${name}`}
				/>
				<small>{errors.message && errors.message.message}</small>
				{/* <Button hidden type='submit'>
        send
      </Button> */}
			</form>
		</ChatInputContainer>
	);
};
export default ChatInput;

const ChatInputContainer = styled.div`
	position: absolute;
	inset: auto auto 30px auto;
	width: 100%;

	z-index: 5;

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
