import { Period } from '../app/config';
import BloodSugar from '../app/core/BloodSugar';

describe('BloodSugar compute', () => {
	const bloodSugar = new BloodSugar() as any; // allow private method
	const testCases = [
		{ value: 50, period: Period.Morning, expected: 0 },
		{ value: 50, period: Period.Midday, expected: 0 },
		{ value: 50, period: Period.Evening, expected: 0 },
		{ value: 75, period: Period.Morning, expected: 2 },
		{ value: 75, period: Period.Midday, expected: 4 },
		{ value: 75, period: Period.Evening, expected: 2 },
		{ value: 110, period: Period.Morning, expected: 3 },
		{ value: 110, period: Period.Midday, expected: 5 },
		{ value: 110, period: Period.Evening, expected: 3 },
		{ value: 175, period: Period.Morning, expected: 4 },
		{ value: 175, period: Period.Midday, expected: 6 },
		{ value: 175, period: Period.Evening, expected: 4 },
		{ value: 210, period: Period.Morning, expected: 5 },
		{ value: 210, period: Period.Midday, expected: 7 },
		{ value: 210, period: Period.Evening, expected: 5 },
		{ value: 280, period: Period.Morning, expected: 6 },
		{ value: 280, period: Period.Midday, expected: 8 },
		{ value: 280, period: Period.Evening, expected: 6 },
		{ value: 400, period: Period.Morning, expected: 7 },
		{ value: 400, period: Period.Midday, expected: 9 },
		{ value: 400, period: Period.Evening, expected: 7 },
	];

	test.each(testCases)(
		'compute($value, $period) should return $expected',
		({ value, period, expected }) => {
			const result = bloodSugar.compute(value, period);
			expect(result).toBe(expected);
		},
	);
});

describe('BloodSugar GetRatio', () => {
	const bloodSugar = new BloodSugar();
	const testCases = [
		{ value: 50, period: Period.Morning, expected: 'INSU' },
		{ value: 110, period: Period.Midday, expected: '5' },
	];

	test.each(testCases)(
		'GetRatio($value, $period) should return $expected',
		({ value, period, expected }) => {
			const result = bloodSugar.GetRatio(value, period);
			expect(result.includes(expected)).toBe(true);
		},
	);
});
