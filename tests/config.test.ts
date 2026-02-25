import { ConfigService, defaultConfig } from '../app/config';
import { AppConfiguration } from '../app/config/AppConfiguration';

describe('Config', () => {
	it('Read default configuration', async () => {
		const configuration: AppConfiguration = await ConfigService.Load();
		expect(configuration).toMatchObject(defaultConfig);
	});
	it('Save configuration', async () => {
		const cfg: AppConfiguration = {
			Application: 'App-test',
			Version: 'Version-test',
			Morning: 0,
			Midday: 0,
			Evening: 0,
			BloodUnit: 'BloodUnit',
			UnitUI: 'UnitUi',
		};
		const saved: boolean = await ConfigService.Save(cfg);
		const readConfig: AppConfiguration = await ConfigService.Load();
		expect(saved).toBe(true);
		expect(readConfig).toMatchObject(cfg);
	});
});
