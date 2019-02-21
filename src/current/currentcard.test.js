import React from 'react';
import { shallow } from 'enzyme';
import CurrentCard, { fToC } from './currentcard';
import { WeatherData } from '../__test_data__';

describe('Render CurrentCard', () => {
	let wrapper = shallow(<CurrentCard current={WeatherData.currently} />);

	test('Render CurrentCard', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

describe('Test fToC function', () => {
	test('fToC converts correctly', () => {
		expect(fToC(32)).toEqual('0');
		expect(fToC(120)).toEqual('49');
		expect(fToC(69)).toEqual('21');
		expect(fToC(19)).toEqual('-7');
		expect(fToC(47)).toEqual('8');
	});
});

describe('CurrentCard should render data correctly', () => {
	const wrapper = shallow(<CurrentCard current={WeatherData.currently} />);
	const weather = wrapper.childAt(0);
	const banner = wrapper.childAt(1);

	test('Summary renders correctly', () => {
		expect(weather.childAt(0).text()).toBe('Light Rain');
	});

	test('Weather icon has correct icon prop', () => {
		expect(weather.childAt(1).prop('icon')).toBe('rain');
	});

	test('Temperature renders correctly', () => {
		expect(
			weather
				.childAt(2)
				.childAt(0)
				.text()
		).toBe('41\u00b0');
		expect(
			weather
				.childAt(2)
				.childAt(1)
				.prop('title')
		).toBe('Feels Like');
		expect(
			weather
				.childAt(2)
				.childAt(1)
				.prop('body')
		).toBe('36\u00b0');
	});

	test('Banner renders correctly', () => {
		expect(banner.childAt(0).prop('title')).toBe('Humidity');
		expect(banner.childAt(0).prop('body')).toBe('94%');

		expect(banner.childAt(1).prop('title')).toBe('Wind Speed');
		expect(banner.childAt(1).prop('body')).toBe('7mph');

		expect(banner.childAt(2).prop('title')).toBe('UV Index');
		expect(banner.childAt(2).prop('body')).toBe('0');
	});
});
