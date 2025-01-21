import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
	telegramId: string;
	firstName: string;
	balance: number;
	lastName?: string;
	username?: string;
	languageCode?: string;
	isPremium?: boolean;
}

interface UserContextType {
	user: User | null;
	loading: boolean;
	error: string | null;
	updateBalance: (amount: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const tg = window.Telegram.WebApp;
				const response = await axios.get<User>( // Указываем ожидаемый тип ответа
					`https://slav4x-telegram-mini-app-server-298e.twc1.net/api/get-user?telegramId=${tg.initDataUnsafe.user.id}`
				);
				setUser(response.data); // Устанавливаем пользователя
			} catch (err: unknown) {
				const errorMessage = axios.isAxiosError(err)
					? err.response?.data?.message || 'Failed to fetch user'
					: 'Unknown error occurred';
				setError(errorMessage);
				console.error('Error fetching user:', errorMessage);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	const updateBalance = async (amount: number) => {
		if (!user) {
			throw new Error('User is not loaded');
		}

		try {
			const response = await axios.post<{ user: User }>( // Указываем ожидаемый тип ответа
				'https://slav4x-telegram-mini-app-server-298e.twc1.net/api/update-balance',
				{
					telegramId: user.telegramId,
					amount
				}
			);
			setUser(response.data.user); // Обновляем данные пользователя
		} catch (err: unknown) {
			const errorMessage = axios.isAxiosError(err)
				? err.response?.data?.message || 'Failed to update balance'
				: 'Unknown error occurred';
			console.error('Error updating balance:', errorMessage);
			throw new Error(errorMessage);
		}
	};

	return <UserContext.Provider value={{ user, loading, error, updateBalance }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
