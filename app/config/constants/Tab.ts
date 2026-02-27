import i18n from '../../i18n';

export interface TabItem {
	text: string;
	icon: string;
}

export const Tab = {
	Home: { text: i18n.t('home'), icon: 'home' },
	Settings: { text: i18n.t('settings'), icon: 'cog' },

	GetTabs(): TabItem[] {
		return [this.Home, this.Settings];
	},
};

export default {};
