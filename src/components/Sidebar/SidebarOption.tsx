import { DialogContext, iDialogContext } from '@/layouts/Default/DefaultLayout';
import { selectChannelAction } from '@/store/channels/channelsSlice';
import { SvgIconComponent } from '@mui/icons-material';
import { useContext, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

interface SidebarOptionProps {
	Icon?: SvgIconComponent;
	id?: string;
	title: string;

	action?: 'addChannel' | 'selectChannel' | null | undefined;
}

const SidebarOption: FC<SidebarOptionProps> = ({
	id,
	Icon,
	title,

	action = null,
}: SidebarOptionProps) => {
	// const
	const dispatch = useDispatch();

	const dialogContext = useContext<iDialogContext>(DialogContext);

	function handleClick() {
		switch (action) {
			case 'addChannel': {
				console.log('action: ', action);
				addChannel();
				break;
			}
			case 'selectChannel': {
				console.log('action: ', action);
				selectChannel(id!);
				break;
			}

			default:
				break;
		}
	}

	function addChannel() {
		dialogContext.openDialog();
	}

	function selectChannel(id: string) {
		if (!id) return;

		dispatch(selectChannelAction(id));
	}

	return (
		<>
			<SidebarOptionContainer onClick={handleClick}>
				{Icon && <Icon fontSize="small" />}
				{Icon ? (
					<h3>{title}</h3>
				) : (
					<SidebarOptionChannel>
						<span>#</span>
						<p>{title}</p>
					</SidebarOptionChannel>
				)}
			</SidebarOptionContainer>
		</>
	);
};
export default SidebarOption;

const SidebarOptionContainer = styled.div`
	--icon-size: 1.25rem;

	display: flex;
	align-items: center;

	gap: 0.5rem;

	font-size: 0.875rem;
	padding: 0.75rem;

	cursor: pointer;

	> svg {
		font-size: var(--icon-size);
		/* font-size: 3rem; */
		/* padding: 0.75rem; */
	}

	> h3 {
		font-weight: 600;
	}

	&:hover {
		opacity: 0.8;
		background-color: var(--slack-color-hovered);
	}
`;

const SidebarOptionChannel = styled.div`
	width: 100%;
	display: flex;
	align-items: center;

	gap: 0.5rem;
	/* margin-left: 1rem; */

	/* padding: 0.75rem; */

	cursor: pointer;

	font-weight: 300;

	> span {
		display: block;

		font-size: 1.25rem;
		line-height: 1;
		width: var(--icon-size);

		/* width: 48px; */
		/* padding: 0.75rem; */
		/* aspect-ratio: 1 / 1; */
		/* padding-block: 0.25rem; */
		/* padding-right: 0rem; */
	}

	> p {
		flex: 1;
		font-weight: 600;

		font-size: 0.875rem;
	}
`;
