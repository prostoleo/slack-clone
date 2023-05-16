import { Suspense, createContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

import './default.css';
import { Button } from '@mui/material';
import { useChannelsData } from '@/hooks/data/useChannelsData';

type FormValues = {
	newChannelName: string;
};

export interface iDialogContext {
	openDialog: () => void;
}

export const DialogContext = createContext<iDialogContext>();

const DefaultLayout = () => {
	const { mutationAddChannel } = useChannelsData();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FormValues> = ({ newChannelName }) => {
		mutationAddChannel.mutate(newChannelName);
		closeDialog();
	};

	const dialogRef = useRef<null | HTMLDialogElement>(null);
	const dialogFormRef = useRef<null | HTMLFormElement>(null);

	function openDialog() {
		dialogRef.current?.showModal();
	}
	function closeDialog() {
		dialogRef.current?.close();
	}

	return (
		<>
			<Header />
			<AppBody>
				<DialogContext.Provider
					value={{
						openDialog,
					}}
				>
					<Sidebar />
				</DialogContext.Provider>

				<Suspense fallback={<p>loading..</p>}>
					<Outlet />
				</Suspense>
			</AppBody>

			<Dialog ref={dialogRef}>
				<h2>Enter name of new channel</h2>

				<form
					method="dialog"
					onSubmit={handleSubmit(onSubmit)}
					ref={dialogFormRef}
				>
					<input
						{...register('newChannelName', {
							validate: (value) =>
								value.length >= 3 ||
								'name of channel should be at least 3 character',
						})}
						type="text"
						placeholder="Name of channel"
					/>
					<small>
						{errors.newChannelName && errors.newChannelName.message}
					</small>
					<DialogBtnContainer>
						<Button type="submit" color="secondary">
							Create
						</Button>
						<Button type="reset" color="error" onClick={closeDialog}>
							Close
						</Button>
					</DialogBtnContainer>
				</form>
			</Dialog>
		</>
	);
};

export default DefaultLayout;

const AppBody = styled.div`
	height: 100%;

	display: grid;
	grid-auto-flow: column;
	grid-template-columns: auto 1fr;

	> * {
		overflow: hidden;
	}
`;

const Dialog = styled.dialog`
	position: fixed;
	top: 50%;
	left: 50%;

	transform: translate(-50%, -50%);

	width: min(50%, 375px);
	padding: 1rem;

	background-color: white;

	&::backdrop {
		background-color: black;
		opacity: 0.5;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 700;
		text-align: center;

		padding-bottom: 1rem;

		border-bottom: 1px solid var(--light-grey);
	}

	> form {
		margin-top: 1rem;

		& > input {
			width: 100%;
			display: block;
			padding: 0.5rem;

			background-color: whitesmoke;
		}
	}
`;

const DialogBtnContainer = styled.div`
	margin-top: 0.5rem;

	display: inline-flex;
	align-items: center;

	gap: 0.25rem;
`;
