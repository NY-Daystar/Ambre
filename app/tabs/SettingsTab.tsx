import Slider from '@react-native-community/slider';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ConfigService } from '../config';
import { AppConfiguration } from '../config/AppConfiguration';

interface SettingType {
	value: string;
	text: string;
}

interface FormValues {
	Morning: SettingType;
	Midday: SettingType;
	Evening: SettingType;
}

interface Props {
	configuration: AppConfiguration;
	setConfiguration: (configuration: AppConfiguration) => void;
}

const styles = StyleSheet.create({
	container: { flex: 2, padding: 20 },
	subTitle: {
		fontSize: 24,
		textAlign: 'center',
		textDecorationLine: 'underline',
		marginTop: 10,
		marginBottom: 20,
	},
	field: { marginBottom: 15 },
	label: { marginBottom: 8, fontSize: 16, fontWeight: 'bold' },
	slider: { height: 40 },
});

export default function SettingsTab({ configuration, setConfiguration }: Props) {
	const { t } = useTranslation();
	const [form, setForm] = useState<FormValues>({
		Morning: {
			text: t('morning'),
			value: configuration.Morning.toString(),
		},
		Midday: {
			text: t('midday'),
			value: configuration.Midday.toString(),
		},
		Evening: {
			text: t('evening'),
			value: configuration.Evening.toString(),
		},
	});

	const updateField = useCallback(
		(key: keyof FormValues, value: number) => {
			const stringValue = value.toString();
			setForm((prev) => ({ ...prev, [key]: { text: t(key), value: stringValue } }));

			configuration[key] = value as never;
			setConfiguration(configuration);
			ConfigService.Save(configuration);
		},
		[configuration, setConfiguration, t],
	);

	return (
		<View style={styles.container}>
			<Text style={styles.subTitle}>{t('settings')}</Text>
			{(Object.keys(form) as (keyof FormValues)[]).map((key) => (
				<View key={key} style={styles.field}>
					<Text style={styles.label}>
						{form[key].text} ({form[key].value} {configuration.UnitUI})
					</Text>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={10}
						step={1}
						value={Number(form[key].value)}
						onValueChange={(value) => updateField(key, value)}
					/>
				</View>
			))}
		</View>
	);
}
