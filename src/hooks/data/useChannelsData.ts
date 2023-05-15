import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addMessageToChannel,
	addNewChannel,
	getChannelOnId,
	getChannels,
	iAddMessageToChannel,
} from '@/services/firebase';

const CHANNELS_KEY = 'channelsData';
const CHANNEL_ID_KEY = 'channelIdData';
const CHANNEL_ID_ADD_MESSAGE = 'channelIdAddMessage';

export function useChannelsData(id: string) {
	const queryClient = useQueryClient();

	const getChannelsQuery = useQuery({
		queryKey: [CHANNELS_KEY],
		queryFn: () => getChannels(),
	});

	const getChannelOnIdQuery = useQuery({
		queryKey: [CHANNEL_ID_KEY, id!],
		queryFn: () => getChannelOnId(id),
	});

	const mutationAddChannel = useMutation({
		mutationFn: (newChannel: string) => addNewChannel(newChannel),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [CHANNELS_KEY],
			});
		},
	});

	const mutationAddMessageToChannel = useMutation({
		mutationFn: (obj: iAddMessageToChannel) => addMessageToChannel(obj),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [CHANNEL_ID_KEY, CHANNEL_ID_ADD_MESSAGE],
			});
		},
	});

	return {
		getChannelsQuery,
		getChannelOnIdQuery,
		mutationAddChannel,
		mutationAddMessageToChannel,
	};
}
