import Chat from '@/components/Chat/Chat';
import { selectSelectedChannel } from '@/store/channels/channelsSlice';
import { useSelector } from 'react-redux';

const HomeRoute = () => {
	const selectedChannel = useSelector(selectSelectedChannel);

	return (
		<>
			<div>
				{/* chat */}
				{/* {selectedChannel ?? 'no selected channel'} */}
				{!!selectedChannel && <Chat id={selectedChannel} />}
			</div>
		</>
	);
};
export default HomeRoute;
