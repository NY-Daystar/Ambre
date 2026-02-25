import { Period } from '../config';
import i18n from '../i18n';

interface BasePeriod {
	period: string;
	base: number;
}

export default class BloodSugar {
	private morningBase: number;
	private middayBase: number;
	private eveningBase: number;

	private unit: string;

	private static MIN_MG = 80;
	private static MAX_MG = 300;

	private bases: BasePeriod[];

	constructor(morning = 3, midday = 5, evening = 3, unit = '') {
		this.morningBase = morning;
		this.middayBase = midday;
		this.eveningBase = evening;
		this.unit = unit;

		this.bases = [
			{ period: Period.Morning, base: this.morningBase },
			{ period: Period.Midday, base: this.middayBase },
			{ period: Period.Evening, base: this.eveningBase },
		];
	}

	public GetRatio(value: number, period: string): string {
		if (value <= BloodSugar.MIN_MG) {
			return i18n.t('noinsuline');
		}

		const ratio = this.compute(value, period);
		return `${ratio}${this.unit}`;
	}

	private compute(value: number, period: string): number {
		const base = this.bases.find((base) => base.period === period)?.base ?? 0;
		if (value < BloodSugar.MIN_MG) {
			return 0;
		}
		if (value > BloodSugar.MIN_MG && value <= 100) {
			return base - 1;
		}
		if (value > 100 && value <= 150) {
			return base;
		}
		if (value > 150 && value <= 200) {
			return base + 1;
		}
		if (value > 200 && value <= 250) {
			return base + 2;
		}
		if (value > 250 && value <= BloodSugar.MAX_MG) {
			return base + 3;
		}
		return base + 4;
	}
}
