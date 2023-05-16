import { FC, ReactNode } from 'react';
import './App.css';
import useAuth from '@/hooks/useAuth';

export interface iAppProps {
	children?: ReactNode;
}

const App: FC<iAppProps> = ({ children }: iAppProps) => {
	useAuth();

	return <>{children}</>;
};
export default App;
