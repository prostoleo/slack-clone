import {
	FiberManualRecord as FiberManualRecordIcon,
	Create as CreateIcon,
	Inbox as InboxIcon,
	Drafts as DraftsIcon,
	BookmarkBorder as BookmarkBorderIcon,
	PeopleAlt as PeopleAltIcon,
	Apps as AppsIcon,
	FileCopy as FileCopyIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
	Add as AddIcon,
} from '@mui/icons-material';
import { styled } from 'styled-components';
import SidebarOption from './SidebarOption';
import { useChannelsData } from '@/hooks/data/useChannelsData';
import useAuth from '@/hooks/useAuth';

const Sidebar = () => {
	const {
		getChannelsQuery: { data: channels },
	} = useChannelsData();

	const { user } = useAuth();

	return (
		<>
			<SidebarContainer>
				<SidebarHeader>
					<SidebarInfo>
						<h2>Welcome aboard</h2>
						<h3>
							<FiberManualRecordIcon />
							<span>{user?.displayName}</span>
						</h3>
					</SidebarInfo>
					<CreateIcon />
				</SidebarHeader>
				<SidebarOptionsContainer>
					<SidebarOption Icon={FiberManualRecordIcon} title="Threads" />
					<SidebarOption Icon={InboxIcon} title="Mentions & Collections" />
					<SidebarOption Icon={DraftsIcon} title="Saved items" />
					<SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
					<SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
					<SidebarOption Icon={AppsIcon} title="Apps" />
					<SidebarOption Icon={FileCopyIcon} title="File Browser" />
					<SidebarOption Icon={ExpandLessIcon} title="Show less" />

					<hr />

					<SidebarOption Icon={ExpandMoreIcon} title="Channels" />
					<hr />
					<SidebarOption
						Icon={AddIcon}
						title="Add Channel"
						action="addChannel"
					/>

					{!!channels && (
						<SidebarChannelsContainer>
							{channels.map((channel) => (
								<SidebarOption
									title={channel?.data.name}
									id={channel?.id}
									action="selectChannel"
									key={channel?.id}
								/>
							))}
						</SidebarChannelsContainer>
					)}
				</SidebarOptionsContainer>
			</SidebarContainer>
		</>
	);
};
export default Sidebar;

const SidebarContainer = styled.aside`
	--px: 1rem;

	width: min(100%, 260px);

	padding-top: 3rem;

	background-color: var(--slack-color);
	color: white;

	border-top: 1px solid var(--light-grey-a);
`;

const SidebarHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-bottom: 0.75rem;
	padding-inline: var(--px);

	border-bottom: 1px solid var(--light-grey-a);

	> svg {
		display: block;
		padding: 0.25rem;
		color: #755784;

		font-size: 1.75rem;

		background-color: white;
		border-radius: 100%;
	}
`;

const SidebarInfo = styled.div`
	flex: 1;

	> h2 {
		font-size: 1.25rem;
		font-weight: 900;

		text-transform: uppercase;

		margin-bottom: 0.5em;
	}

	> h3 {
		display: flex;
		align-items: center;

		font-size: 0.875rem;
		font-weight: 400;

		> svg {
			color: green;

			font-size: 1rem;
			margin-top: 1px;
			margin-right: 2px;
		}
	}
`;

const SidebarOptionsContainer = styled.div`
	margin-top: 2.5rem;
	padding-inline: var(--px);

	display: grid;

	hr {
		display: block;
		margin-block: 0.75rem;

		border: 1px solid var(--light-grey-a);
	}
`;

const SidebarChannelsContainer = styled.div`
	display: grid;
	gap: 0.25rem;
`;
