// utils/responsive.ts
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Dimension {
	width: number;
	height: number;
}

/**
 * Adapt component size depending of screen size
 * @param percentage percentage of the component for the screen
 * @returns
 */
export const wp = (percentage: number): Dimension => {
	return {
		height: height * (percentage / 100),
		width: width * (percentage / 100),
	} as Dimension;
};

export default wp;
