import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { TelegramService } from '@/services/telegram';
import axios from 'axios';
import { NavLink } from 'react-router';

interface ProfileData {
	registrationDate: string;
	balance: number;
	taps: number;
}

export default function Profile() {
	const [profileData, setProfileData] = useState<ProfileData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			const tg = TelegramService.getWebApp();
			const telegramId = tg.initDataUnsafe?.user?.id;

			try {
				const response = await axios.get<ProfileData>(`${import.meta.env.VITE_API_URL}/api/get-profile`, {
					params: { telegramId }
				});
				setProfileData(response.data);
			} catch (err) {
				setError('Failed to fetch profile data');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	return (
		<div className={styles['profile-layout']}>
			<ul className={styles['profile-nav']}>
				<li>
					<NavLink className={({ isActive }) => (isActive ? styles['profile-nav__active'] : '')} to="/profile">
						Info
					</NavLink>
				</li>
				<li className={styles['profile-nav__disabled']}>
					<NavLink className={({ isActive }) => (isActive ? styles['profile-nav__active'] : '')} to=" ">
						Airdrop
					</NavLink>
				</li>
			</ul>
			<div className={styles['profile-info']}>
				{loading && (
					<div className={styles['profile-item']} style={{ height: '100%' }}>
						<span className="loader"></span>
					</div>
				)}

				{error && (
					<div className={styles['profile-item']}>
						<div className={styles['leaderboard-name']}>Error: {error}</div>
					</div>
				)}

				{!loading && !error && (
					<>
						<div className={styles['profile-item']}>
							<p>You've become a genius:</p>
							<p>{profileData?.registrationDate}</p>
						</div>
						<div className={styles['profile-item']}>
							<p>Total collected $GENIO:</p>
							<p>{profileData?.balance}</p>
						</div>
						<div className={styles['profile-item']}>
							<p>Total taps:</p>
							<p>{profileData?.taps}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
