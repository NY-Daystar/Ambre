import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Period } from '../config';
import { wp } from '../utils/responsive';

interface Props {
	selected: string;
	onChange: (value: string) => void;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	button: {
		minWidth: wp(25).width,
		padding: 15,
		borderWidth: 1,
		borderRadius: 10,
	},
	selected: {
		backgroundColor: 'coral',
	},
	selectedLabel: {
		color: 'white',
	},
	text: {
		fontSize: 18,
		color: 'coral',
		textAlign: 'center',
	},
});

export default function RadioGroup({ selected, onChange }: Props) {
	const options: string[] = Period.GetPeriods();

	return (
		<View style={styles.container}>
			{options.map((option) => (
				<TouchableOpacity
					key={option}
					style={[styles.button, selected === option && styles.selected]}
					onPress={() => onChange(option)}
				>
					<Text style={[styles.text, selected === option && styles.selectedLabel]}>{option}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
