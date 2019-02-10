import React from 'react';
import { shallow } from 'enzyme';
import CurrentCard, { fToC } from './currentcard';
import { WeatherData } from '../__test_data__';

describe('Render CurrentCard', () => {
	let wrapper = shallow(<CurrentCard current={WeatherData.currently} />);

	test('Render CurrentCard', () => {
		expect(wrapper.exists()).toBe(true);
	});

	test('fToC converts correctly', () => {
		expect(fToC(32)).toEqual('0');
		expect(fToC(120)).toEqual('49');
		expect(fToC(69)).toEqual('21');
		expect(fToC(19)).toEqual('-7');
		expect(fToC(47)).toEqual('8');
	});
});
