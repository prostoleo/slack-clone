import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchEmailOnId, fetchEmails, addEmail } from '@/services/firebase';
import { iSendEmail } from '@/components/Email/SendEmail/SendEmail';

export function useGetMails() {
	return useQuery({
		queryKey: ['emailsData'],
		queryFn: () => fetchEmails(),
	});
}

export function useGetMailOnId(id: string) {
	return useQuery({
		queryKey: ['emailData', id],
		queryFn: () => fetchEmailOnId(id!),
	});
}

export function useMutationAddEmail() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newEmail: iSendEmail) => addEmail(newEmail),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['emailsData'],
			});
		},
	});
}

export function useMailData(id = '') {
	const queryClient = useQueryClient();

	const getMails = useQuery({
		queryKey: ['emailsData'],
		queryFn: () => fetchEmails(),
	});

	const getMailOnId = useQuery({
		queryKey: ['emailData', id],
		queryFn: () => fetchEmailOnId(id!),
	});

	const mutationAddEmail = useMutation({
		mutationFn: (newEmail: iSendEmail) => addEmail(newEmail),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['emailsData'],
			});
		},
	});

	return {
		getMails,
		getMailOnId,
		mutationAddEmail,
	};
}
