import '../styles/globals.css';
import { useEffect, useState, createContext, useContext } from 'react';

const ThemeCtx = createContext({ theme: 'dark', toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export default function App({ Component, pageProps }) {
	const [theme, setTheme] = useState('dark');
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);
	const value = { theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) };
	return (
		<ThemeCtx.Provider value={value}>
			<Component {...pageProps} />
		</ThemeCtx.Provider>
	);
}
