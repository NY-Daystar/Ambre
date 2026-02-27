import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ConfigService } from '../config';
import { AppConfiguration } from '../config/AppConfiguration';

interface SettingType {
	value: string;
	keyType: string;
	text: string;
}

interface FormValues {
	Morning: SettingType;
	Midday: SettingType;
	Evening: SettingType;
	BloodUnit: SettingType;
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
	input: {
		borderWidth: 1,
		padding: 8,
		borderRadius: 5,
	},
	unit: {
		marginLeft: 15,
		fontSize: 18,
	},
});

export default function SettingsTab({ configuration, setConfiguration }: Props) {
	const { t } = useTranslation();
	const [form, setForm] = useState<FormValues>({
		Morning: {
			text: t('morning'),
			value: configuration.Morning.toString(),
			keyType: 'numeric',
		},
		Midday: {
			text: t('midday'),
			value: configuration.Midday.toString(),
			keyType: 'numeric',
		},
		Evening: {
			text: t('evening'),
			value: configuration.Evening.toString(),
			keyType: 'numeric',
		},
		BloodUnit: {
			text: t('unit'),
			value: configuration.BloodUnit.toString(),
			keyType: 'default',
		},
	});

	const updateField = (key: keyof FormValues, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		if (!isNaN(Number(value))) {
			configuration[key] = Number(value) as never;
		} else {
			configuration[key] = value as never;
		}

		setConfiguration(configuration);
		ConfigService.Save(configuration);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.subTitle}>{t('settings')}</Text>
			{(Object.keys(form) as (keyof FormValues)[]).map((key) => (
				<View key={key} style={styles.field}>
					<Text>{form[key].text}</Text>
					<TextInput
						keyboardType={form[key].keyType === 'numeric' ? 'numeric' : 'default'}
						style={styles.input}
						value={form[key].value}
						onChangeText={(text) => updateField(key, text)}
					/>
					<Text style={styles.unit}>{configuration.UnitUI}</Text>
				</View>
			))}
		</View>
	);
}
