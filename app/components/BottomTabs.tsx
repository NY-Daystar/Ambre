import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tab } from '../config';
import { wp } from '../utils/responsive';

interface Props {
	activeTab: string;
	onChange: (tab: string) => void;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderTopWidth: 1,
		marginBottom: wp(5).height,
	},
	tab: {
		flex: 1,
		padding: 15,
		alignItems: 'center',
	},
	active: {
		backgroundColor: 'skyblue',
	},
	text: {
		fontSize: 18,
	},
});

export default function BottomTabs({ activeTab, onChange }: Props) {
	const tabs: string[] = Tab.GetTabs();

	return (
		<View style={styles.container}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab}
					style={[styles.tab, activeTab === tab && styles.active]}
					onPress={() => onChange(tab)}
				>
					<Text style={styles.text}>{tab}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
