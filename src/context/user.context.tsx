import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
	balance: number;
	setBalance: (newBalance: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Провайдер контекста
export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [balance, setBalance] = useState<number>(0);

	return <UserContext.Provider value={{ balance, setBalance }}>{children}</UserContext.Provider>;
};

// Хук для доступа к контексту
export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
