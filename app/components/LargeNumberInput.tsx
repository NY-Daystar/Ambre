import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
	value: string;
	unit: string;
	onChange: (value: string) => void;
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		alignItems: 'center',
	},
	input: {
		flex: 2,
		fontSize: 50,
		textAlign: 'center',
		marginBottom: 10,
	},
	unit: {
		flex: 1,
		fontSize: 35,
		textAlign: 'center',
	},
});

export default function LargeNumberInput({ value, unit, onChange }: Props) {
	return (
		<View style={styles.view}>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={value}
				onChangeText={onChange}
				placeholder="0"
			/>
			<Text style={styles.unit}>{unit}</Text>
		</View>
	);
}
