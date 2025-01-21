import { useEffect, useRef } from 'react';

interface Star {
	x: number;
	y: number;
	size: number;
	opacity: number;
	fadeSpeed: number;
}

interface Bar {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	segments: { opacity: number }[];
}

export const useCanvasAnimation = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;

		// Массивы объектов для анимации
		const stars: Star[] = Array.from({ length: 100 }).map(() => ({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: 2,
			opacity: Math.random(),
			fadeSpeed: 0.001 + Math.random() * 0.002
		}));

		const barSpacing = window.innerWidth / 7;
		const bars: Bar[] = Array.from({ length: 7 }).map((_, index) => ({
			x: barSpacing * index + barSpacing / 2 + Math.random() * 50 - 25,
			y: Math.random() * window.innerHeight,
			width: 4,
			height: 40,
			speed: Math.random() * 1 + 0.1,
			segments: Array.from({ length: 10 }).map((_, i) => ({
				opacity: 1 - i * 0.1
			}))
		}));

		const updateCanvasSize = () => {
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
			ctx.scale(dpr, dpr);
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

			// Рисуем звезды
			stars.forEach((star) => {
				star.opacity -= star.fadeSpeed;
				if (star.opacity <= 0) {
					star.x = Math.random() * window.innerWidth;
					star.y = Math.random() * window.innerHeight;
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
					bar.y = window.innerHeight + Math.random() * 200;
					bar.x = barSpacing * bars.indexOf(bar) + barSpacing / 2 + Math.random() * 50 - 25;
				}
				bar.segments.forEach((segment, i) => {
					const segmentY = bar.y + i * 4;
					if (segmentY + 4 >= 0 && segmentY <= window.innerHeight) {
						ctx.beginPath();
						ctx.rect(bar.x, segmentY, bar.width, 4);
						ctx.fillStyle = `rgba(0, 0, 0, ${segment.opacity})`;
						ctx.fill();
					}
				});
			});

			requestAnimationFrame(draw);
		};

		updateCanvasSize();
		draw();

		window.addEventListener('resize', updateCanvasSize);

		return () => {
			window.removeEventListener('resize', updateCanvasSize);
		};
	}, []);

	return canvasRef;
};
