import i18n from '../../i18n';

export default {
	Morning: i18n.t('morning'),
	Midday: i18n.t('midday'),
	Evening: i18n.t('evening'),

	GetPeriods(): string[] {
		return [this.Morning, this.Midday, this.Evening];
	},
};
