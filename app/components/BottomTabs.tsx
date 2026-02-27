import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Tab, TabItem } from '../config';
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
	const tabs: TabItem[] = Tab.GetTabs();

	const handleTabPress = useCallback(
		(tabText: string) => {
			onChange(tabText);
		},
		[onChange],
	);

	return (
		<View style={styles.container}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab.text}
					style={[styles.tab, activeTab === tab.text && styles.active]}
					onPress={() => handleTabPress(tab.text)}
				>
					<FontAwesome name={tab.icon as any} size={24} color="black" />
				</TouchableOpacity>
			))}
		</View>
	);
}
