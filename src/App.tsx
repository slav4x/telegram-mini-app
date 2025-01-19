import { useEffect } from 'react';

const App: React.FC = () => {
	useEffect(() => {
		const tg = window.Telegram.WebApp;

		tg.expand(); // Fullscreen mode
		tg.ready(); // Init Telegram App
	}, []);

	return (
		<div style={{ padding: '16px', textAlign: 'center' }}>
			<h1>Welcome to Telegram Mini App</h1>
			<button
				onClick={() => {
					window.Telegram.WebApp.close(); // Example of using Telegram API
				}}
				style={{
					padding: '10px 20px',
					backgroundColor: '#0088cc',
					color: '#fff',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer'
				}}
			>
				Close App
			</button>
		</div>
	);
};

export default App;
