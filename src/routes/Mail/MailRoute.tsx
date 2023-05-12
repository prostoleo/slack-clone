import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './MailRoute.module.scss';
import { IconButton } from '@mui/material';
import {
	ArrowBack,
	Delete,
	Email,
	Error as ErrorIcon,
	ExitToApp,
	LabelImportant,
	MoreVert,
	MoveToInbox,
	Print,
	UnfoldMore,
	WatchLater,
} from '@mui/icons-material';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchEmailOnId } from '@/services/firebase';
import { formatDate, stringify } from '@/utils/formatters';
import { useGetMailOnId, useMailData } from '@/hooks/data/useMailData';

interface MailRouteProps {}

const MailRoute: FC<MailRouteProps> = ({}) => {
	const { id } = useParams();
	const navigate = useNavigate();

	// const { isLoading, error, data } = useGetMailOnId(id!);
	const {
		getMailOnId: { data, isLoading, error },
	} = useMailData(id);

	if (isLoading) return <p>Loading..</p>;
	if (error) return <p>error - {error.message}</p>;

	return (
		<>
			<div className={styles.mail}>
				<div className={styles.mail__tools}>
					<div className={styles.mail__toolsLeft}>
						<IconButton onClick={() => navigate(-1)}>
							<ArrowBack />
						</IconButton>
						<IconButton>
							<MoveToInbox />
						</IconButton>
						<IconButton>
							<ErrorIcon />
						</IconButton>
						<IconButton>
							<Delete />
						</IconButton>
						<IconButton>
							<Email />
						</IconButton>
						<IconButton>
							<WatchLater />
						</IconButton>
						<IconButton>
							<LabelImportant />
						</IconButton>
						<IconButton>
							<MoreVert />
						</IconButton>
					</div>
					<div className={styles.mail__toolsRight}>
						<IconButton>
							<UnfoldMore />
						</IconButton>
						<IconButton>
							<Print />
						</IconButton>
						<IconButton>
							<ExitToApp />
						</IconButton>
					</div>
				</div>
				<div className={styles.mail__body}>
					{/* <pre>{stringify(data?.email)}</pre> */}
					<div className={styles.mail__bodyHeader}>
						<h2 className={styles.mail__bodyHeaderSubject}>
							{data?.email?.subject}
						</h2>
						<LabelImportant className={styles.mail__bodyHeaderIcon} />
						<p className={styles.mail__bodyHeaderTitle}>
							{data?.email?.subject}
						</p>
						<p className={styles.mail__bodyHeaderTime}>
							{formatDate(data?.email?.date.toDate()!)}
						</p>
					</div>

					<div className={styles.mail__bodyMessage}>
						<p>{data?.email?.message}</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default MailRoute;
