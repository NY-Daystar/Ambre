import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfiguration } from './AppConfiguration';
import defaultConfig from './config.default';

const STORAGE_KEY = 'AMBRE_CONFIGURATION';

export default {
	async Load(): Promise<AppConfiguration> {
		try {
			//await AsyncStorage.removeItem(STORAGE_KEY);
			const json = await AsyncStorage.getItem(STORAGE_KEY);
			if (json) {
				return JSON.parse(json) as AppConfiguration;
			}
			return defaultConfig;
		} catch (error) {
			throw new Error(
				`Error loading config: ${error}, Loading default config`,
			);
		}
	},

	async Save(config: AppConfiguration): Promise<boolean> {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
			return true;
		} catch (error) {
			throw new Error(`Error saving config:, ${error}`);
		}
	},
};
