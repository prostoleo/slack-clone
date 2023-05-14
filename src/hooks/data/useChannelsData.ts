import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewChannel, getChannels } from '@/services/firebase';

const CHANNELS_KEY = 'channelsData';

export function useChannelsData() {
	const queryClient = useQueryClient();

	const getChannelsQuery = useQuery({
		queryKey: [CHANNELS_KEY],
		queryFn: () => getChannels(),
	});

	const mutationAddChannel = useMutation({
		mutationFn: (newChannel: string) => addNewChannel(newChannel),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [CHANNELS_KEY],
			});
		},
	});

	return {
		getChannelsQuery,
		mutationAddChannel,
	};
}
