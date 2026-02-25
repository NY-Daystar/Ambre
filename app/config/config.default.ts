import app from '../../app.json';
import { AppConfiguration } from './AppConfiguration';

const defaultConfig: AppConfiguration = {
	Version: app.expo.version,
	Application: app.expo.name,
	Morning: 3,
	Midday: 5,
	Evening: 3,
	BloodUnit: 'mg',
	UnitUI: 'UI',
};

export default defaultConfig;
