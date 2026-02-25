import React, { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { BottomTabs } from './components';
import { ConfigService, defaultConfig, Tab } from './config';
import { AppConfiguration } from './config/AppConfiguration';
import './i18n';
import { HomeTab, SettingsTab } from './tabs';

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: { flex: 1 },
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 25,
		marginBottom: 20,
	},
	versionContainer: {
		position: 'absolute',
		top: 40,
		right: 15,
		zIndex: 100,
	},
	versionText: {
		fontSize: 14,
		color: '#666',
	},
});

export default function App() {
	const appRefState = useRef(AppState.currentState);
	const [appState, setAppState] = useState(appRefState.current);
	const [activeTab, setActiveTab] = useState<string>(Tab.Home);
	const [config, setConfig] = useState<AppConfiguration>(defaultConfig);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const init = async () => {
			const savedConfig = await ConfigService.Load();
			setConfig(savedConfig);
			setIsLoaded(true);
		};
		init();
	}, []);

	useEffect(() => {
		if (isLoaded) {
			ConfigService.Save(config);
		}
	}, [config, isLoaded]);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			appRefState.current = nextAppState;
			setAppState(appRefState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{config.Application}</Text>
			<View style={styles.versionContainer}>
				<Text style={styles.versionText}>v{config.Version}</Text>
			</View>
			<View style={styles.content}>
				{activeTab === Tab.Home ? (
					<HomeTab configuration={config} isActive={appState === 'active'} />
				) : (
					<SettingsTab configuration={config} setConfiguration={setConfig} />
				)}
			</View>

			<BottomTabs activeTab={activeTab} onChange={setActiveTab} />
		</View>
	);
}
