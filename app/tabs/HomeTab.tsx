import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { LargeNumberInput, RadioGroup } from '../components';
import { Period } from '../config';
import { AppConfiguration } from '../config/AppConfiguration';
import { BloodSugar } from '../core';

interface Props {
	configuration: AppConfiguration;
	isActive: boolean;
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	resultLabel: {
		fontSize: 30,
		marginTop: 50,
		textAlign: 'center',
	},
	result: {
		fontSize: 40,
		marginTop: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#0e6969',
	},
	divider: {
		marginTop: 50,
	},
});

export default function HomeTab({ configuration, isActive }: Props) {
	const { t } = useTranslation();
	const [selected, setSelected] = useState<string>('');
	const [number, setNumber] = useState<string>('');

	useEffect(() => {
		setSelected(determineTimeZone());
	}, [isActive]);

	const result = useMemo(() => {
		const input = parseFloat(number) || 0;
		const bs: BloodSugar = new BloodSugar(
			configuration.Morning,
			configuration.Midday,
			configuration.Evening,
			configuration.UnitUI,
		);
		return bs.GetRatio(input, selected);
	}, [number, selected, configuration]);

	return (
		<View style={styles.container}>
			<RadioGroup selected={selected} onChange={setSelected} />

			<View style={styles.divider}></View>

			<LargeNumberInput value={number} unit={configuration.BloodUnit} onChange={setNumber} />

			<View style={styles.divider}></View>

			<Text style={styles.resultLabel}>{t('result')}</Text>
			<Text style={styles.result}>{result}</Text>
		</View>
	);
}

/**
 * This function determine if we are on morning, midday or evening depending of the hour
 * @returns Timezone potential
 */
function determineTimeZone(): string {
	const hourNow: number = new Date().getHours();
	if (hourNow >= 12 && hourNow <= 14) return Period.Midday;
	if (hourNow > 14 && hourNow < 24) return Period.Evening;
	return Period.Morning;
}
