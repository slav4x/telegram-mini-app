import { useEffect, useState } from 'react';

import { useUser } from '@/context/user.context';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';

import styles from './Earn.module.css';

export default function Earn() {
	const canvasRef = useCanvasAnimation();
	const [userId, setUserId] = useState<number | null>(null);

	const { updateBalance } = useUser();

	useEffect(() => {
		const tg = window.Telegram.WebApp;

		if (tg.initDataUnsafe?.user?.id) {
			setUserId(tg.initDataUnsafe.user.id);
		} else {
			console.error('Failed to get user ID from Telegram WebApp.');
		}
	}, []);

	const updateUserBalance = async (amount: number) => {
		try {
			await updateBalance(amount);
			console.log('Balance updated');
		} catch (err) {
			console.error('Error updating balance:', err);
		}
	};

	return (
		<>
			<canvas ref={canvasRef} className={styles.background} />
			Earn
			<br />
			{userId ? (
				<div>
					<p>Telegram ID: {userId}</p>
					<button onClick={() => updateUserBalance(10)}>+10 coin</button>
				</div>
			) : (
				<p>Не удалось получить данные пользователя</p>
			)}
		</>
	);
}
