import { TelegramService } from '@/services/telegram';
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
				const tg = TelegramService.getWebApp();
				const response = await axios.get<User>( // Указываем ожидаемый тип ответа
					`${import.meta.env.VITE_API_URL}/api/get-user?telegramId=${tg.initDataUnsafe.user.id}`
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

		const previousBalance = user.balance;
		setUser({ ...user, balance: previousBalance + amount });

		try {
			const response = await axios.post<{ user: User }>(`${import.meta.env.VITE_API_URL}/api/update-balance`, {
				telegramId: user.telegramId,
				amount
			});
			setUser(response.data.user);
		} catch (err) {
			setUser({ ...user, balance: previousBalance });
			console.error('Error updating balance:', err);
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
