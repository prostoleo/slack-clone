import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addMessageToChannel,
	addNewChannel,
	getChannelOnId,
	getChannels,
	iAddMessageInChannel,
	getMessagesInChat,
} from '@/services/firebase';

const CHANNELS_KEY = 'channelsKey';
const CHANNEL_ID_KEY = 'channelIdKey';
const CHANNEL_ID_ADD_MESSAGE = 'channelIdAddMessageKey';

export function useChannelsData(id = '') {
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
		mutationFn: (obj: iAddMessageInChannel) => addMessageToChannel(obj),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [CHANNEL_ID_KEY, CHANNEL_ID_ADD_MESSAGE],
			});
		},
	});

	const getMessagesInChatQuery = useQuery({
		queryKey: [CHANNEL_ID_KEY, CHANNEL_ID_ADD_MESSAGE, id!],
		queryFn: () => getMessagesInChat(id),
	});

	return {
		getChannelsQuery,
		getChannelOnIdQuery,

		mutationAddChannel,
		mutationAddMessageToChannel,

		getMessagesInChatQuery,
	};
}
