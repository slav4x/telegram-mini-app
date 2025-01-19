import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { LayoutApp } from './layout';

const Tasks = React.lazy(() => import('./pages/Tasks/Tasks'));
const Earn = React.lazy(() => import('./pages/Earn/Earn'));
const Boost = React.lazy(() => import('./pages/Boost/Boost'));
const Fame = React.lazy(() => import('./pages/Fame/Fame'));
const Daily = React.lazy(() => import('./pages/Daily/Daily'));
const Shop = React.lazy(() => import('./pages/Shop/Shop'));

function App() {
	return (
		<BrowserRouter basename="/telegram-mini-app">
			<React.Suspense fallback={<>...</>}>
				<Routes>
					<Route element={<LayoutApp />}>
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/" element={<Earn />} />
						<Route path="/boost" element={<Boost />} />
						<Route path="/fame" element={<Fame />} />

						<Route path="/daily" element={<Daily />} />
						<Route path="/shop" element={<Shop />} />
					</Route>
				</Routes>
			</React.Suspense>
		</BrowserRouter>
	);
}

export default App;
