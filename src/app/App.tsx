import { ReactNode } from 'react';
import './App.css';

export interface iAppProps {
	children?: ReactNode;
}

const App: FC<iAppProps> = ({ children }: iAppProps) => {
	return <>{children}</>;
};
export default App;
