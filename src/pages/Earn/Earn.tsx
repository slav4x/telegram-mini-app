import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useUser } from '@/context/user.context';

import styles from './Earn.module.css';

export default function Earn() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [userId, setUserId] = useState<number | null>(null);

	const { balance, setBalance } = useUser();

	useEffect(() => {
		// Инициализация Telegram WebApp и получение id пользователя
		const tg = window.Telegram.WebApp;

		// Проверяем, есть ли initDataUnsafe
		if (tg.initDataUnsafe?.user?.id) {
			setUserId(tg.initDataUnsafe.user.id);
		} else {
			console.error('Failed to get user ID from Telegram WebApp.');
		}
	}, []);

	const updateUserBalance = async (amount: number) => {
		if (!userId) {
			console.error('User ID is not available.');
			return;
		}

		try {
			// Отправляем запрос на сервер
			const response = await axios.post('https://slav4x-telegram-mini-app-server-298e.twc1.net/api/update-balance', {
				telegramId: String(userId),
				amount
			});
			setBalance(response.data.user.balance);

			console.log(balance);

			console.log('Balance updated:', response.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error('Axios error:', error.response?.data || error.message);
			} else if (error instanceof Error) {
				console.error('General error:', error.message);
			} else {
				console.error('Unknown error:', error);
			}
		}
	};

	useEffect(() => {
		const updateCanvasSize = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext('2d')!;
			if (!ctx) return;

			const dpr = window.devicePixelRatio || 1;
			const tg = window.Telegram?.WebApp;

			// Вычисляем высоту экрана (учитывая Telegram API и iOS)
			const viewportHeight = window.visualViewport?.height || tg?.viewportStableHeight || window.innerHeight;

			// Устанавливаем физический размер canvas (с учётом dpr)
			canvas.width = window.innerWidth * dpr;
			canvas.height = viewportHeight * dpr;

			// Логические размеры для отображения
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${viewportHeight}px`;

			// Масштабируем контекст
			ctx.scale(dpr, dpr);

			// Используем логические размеры для расчётов
			const logicalWidth = window.innerWidth; // Без учёта dpr
			const logicalHeight = viewportHeight;

			// Массив звёзд
			const stars = Array.from({ length: 100 }).map(() => ({
				x: Math.random() * logicalWidth,
				y: Math.random() * logicalHeight,
				size: 2,
				opacity: Math.random(),
				fadeSpeed: 0.001
			}));

			// Полоски
			const barSpacing = logicalWidth / 7; // Логическая ширина экрана делится на 7
			const bars = Array.from({ length: 7 }).map((_, index) => ({
				x: barSpacing * index + barSpacing / 2 + Math.random() * 50 - 25,
				y: Math.random() * logicalHeight,
				width: 4,
				height: 40,
				speed: Math.random() * 1 + 0.1,
				segments: Array.from({ length: 10 }).map((_, i) => ({
					opacity: 1 - i * 0.1
				}))
			}));

			function draw() {
				// Очищаем канвас на логическом уровне
				ctx.clearRect(0, 0, logicalWidth, logicalHeight);

				// Рисуем звёзды
				stars.forEach((star) => {
					star.opacity -= star.fadeSpeed;

					if (star.opacity <= 0) {
						star.x = Math.random() * logicalWidth;
						star.y = Math.random() * logicalHeight;
						star.opacity = 1;
					}

					ctx.beginPath();
					ctx.rect(star.x, star.y, star.size, star.size);
					ctx.fillStyle = `rgba(0, 0, 0, ${star.opacity})`;
					ctx.fill();
				});

				// Рисуем полоски
				bars.forEach((bar) => {
					bar.y -= bar.speed;

					if (bar.y + bar.height <= 0) {
						bar.y = logicalHeight + Math.random() * 200;
						bar.x = barSpacing * bars.indexOf(bar) + barSpacing / 2 + Math.random() * 50 - 25;
					}

					bar.segments.forEach((segment, i) => {
						const segmentY = bar.y + i * 4;
						if (segmentY + 4 >= 0 && segmentY <= logicalHeight) {
							ctx.beginPath();
							ctx.rect(bar.x, segmentY, bar.width, 4);
							ctx.fillStyle = `rgba(0, 0, 0, ${segment.opacity})`;
							ctx.fill();
						}
					});
				});

				requestAnimationFrame(draw);
			}

			draw();
		};

		updateCanvasSize();

		window.addEventListener('resize', updateCanvasSize);
		return () => {
			window.removeEventListener('resize', updateCanvasSize);
		};
	}, []);

	return (
		<>
			<div className={styles.background}>
				<canvas
					ref={canvasRef}
					width={window.innerWidth}
					height={window.innerHeight}
					style={{
						position: 'absolute',
						top: 0,
						left: 0
					}}
				/>
			</div>
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
