import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { UserProvider } from './context/user.context';
import { LayoutApp } from './layout';
import { TelegramService } from './services/telegram';

const Tasks = React.lazy(() => import('./pages/Tasks/Tasks'));
const Earn = React.lazy(() => import('./pages/Earn/Earn'));
const Boost = React.lazy(() => import('./pages/Boost/Boost'));
const Fame = React.lazy(() => import('./pages/Fame/Fame'));
const Daily = React.lazy(() => import('./pages/Daily/Daily'));
const Shop = React.lazy(() => import('./pages/Shop/Shop'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));

function ErrorBoundary({ children }: { children: React.ReactNode }) {
	return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>;
}

function App() {
	useEffect(() => {
		const tg = TelegramService.getWebApp();
		console.log(tg.initData);

		if (tg.initData) {
			axios
				.post(`${import.meta.env.VITE_API_URL}/api/save-user`, { initData: tg.initData })
				.then((response) => {
					console.log('User saved:', response.data);
				})
				.catch((error) => {
					console.error('Error saving user:', error);
				});
		} else {
			console.error('Telegram initData not available');
		}
	}, []);

	return (
		<UserProvider>
			<BrowserRouter>
				<ErrorBoundary>
					<Routes>
						<Route element={<LayoutApp />}>
							<Route path="/tasks" element={<Tasks />} />
							<Route path="/" element={<Earn />} />
							<Route path="/boost" element={<Boost />} />
							<Route path="/fame" element={<Fame />} />

							<Route path="/profile" element={<Profile />} />
							<Route path="/daily" element={<Daily />} />
							<Route path="/shop" element={<Shop />} />
						</Route>
					</Routes>
				</ErrorBoundary>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
