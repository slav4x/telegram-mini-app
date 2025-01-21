import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Fame.module.css';
import { TelegramService } from '@/services/telegram';

interface LeaderboardItem {
	id: string;
	name: string;
	balance: number;
}

interface LeaderboardResponse {
	message: string;
	leaderboard: LeaderboardItem[];
	currentUserPosition: {
		position: number;
		balance: number;
	};
	totalUsers: number;
}

export default function Fame() {
	const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
	const [currentUser, setCurrentUser] = useState<{ position: number; balance: number } | null>(null);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			const tg = TelegramService.getWebApp();
			const telegramId = tg.initDataUnsafe?.user?.id;

			try {
				const response = await axios.get<LeaderboardResponse>(`${import.meta.env.VITE_API_URL}/api/get-leaderboard`, {
					params: { telegramId } // Передача telegramId в запросе
				});
				setLeaderboard(response.data.leaderboard);
				setCurrentUser(response.data.currentUserPosition);
				setTotalUsers(response.data.totalUsers);
			} catch (err) {
				setError('Failed to fetch leaderboard');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchLeaderboard();
	}, []);

	return (
		<div className={styles['fame-layout']}>
			<div className={styles['fame-head']}>
				<div className={styles['fame-title']}>
					<span></span>Liderboard<span></span>
				</div>
				<div className={styles['fame-text']}>Wall Of Genious</div>
			</div>
			<div className={styles['fame-total']}>Total $GENIO holders: {totalUsers}</div>
			<div className={styles['leaderboard']}>
				<div className={styles['leaderboard-top']}>
					<div className={styles['leaderboard-item']}>
						<div className={styles['leaderboard-position']}>Position</div>
						<div className={styles['leaderboard-name']}>Name</div>
						<div className={styles['leaderboard-score']}>Score</div>
					</div>
				</div>
				<div className={styles['leaderboard-list']}>
					{loading && (
						<div className={styles['leaderboard-info']} style={{ height: '100%' }}>
							<span className="loader"></span>
						</div>
					)}

					{error && (
						<div className={styles['leaderboard-info']}>
							<div className={styles['leaderboard-name']}>Error: {error}</div>
						</div>
					)}

					{!loading &&
						!error &&
						leaderboard.map((item) => (
							<div className={styles['leaderboard-item']} key={item.id}>
								<div className={styles['leaderboard-position']}>#{item.id}</div>
								<div className={styles['leaderboard-name']}>{item.name}</div>
								<div className={styles['leaderboard-score']}>{item.balance}</div>
							</div>
						))}
				</div>
				{currentUser && (
					<div className={styles['leaderboard-me']}>
						<div className={styles['leaderboard-item']}>
							<div className={styles['leaderboard-position']}>#{currentUser.position}</div>
							<div className={styles['leaderboard-name']}>You</div>
							<div className={styles['leaderboard-score']}>{currentUser.balance}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
