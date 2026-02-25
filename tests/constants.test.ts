import { Period, Tab } from '../app/config';

describe('Constants', () => {
	it('Test constants of Period', () => {
		const periods = Period.GetPeriods();
		expect(periods.length).toBe(3);
	});
	it('Test constants of Tab', () => {
		const tabs = Tab.GetTabs();
		expect(tabs.length).toBe(2);
	});
});
