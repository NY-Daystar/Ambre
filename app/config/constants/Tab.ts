import i18n from '../../i18n';

export default {
	Home: i18n.t('home'),
	Settings: i18n.t('settings'),

	GetTabs(): string[] {
		return [this.Home, this.Settings];
	},
};
