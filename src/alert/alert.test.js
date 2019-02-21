import React from 'react';
import { shallow } from 'enzyme';
import Alert from './alert';
import { WeatherData } from '../__test_data__';

describe('Render Alert', () => {
	const wrapper = shallow(<Alert alerts={WeatherData.alerts} />);

	test('Render Alerts', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

describe('Alerts renders correctly', () => {
	let wrapper;

	test('Render null on empty alerts data', () => {
		wrapper = shallow(<Alert alerts={{}} />);
		expect(wrapper.instance()).toBe(null);
	});

	test('Render alerts with valid alerts data', () => {
		wrapper = shallow(<Alert alerts={WeatherData.alerts} />);
		expect(wrapper.exists()).toBe(true);
	});

	test('Alerts has correct number of children', () => {
		wrapper = shallow(<Alert alerts={WeatherData.alerts} />);
		expect(wrapper.children().length).toBe(2);
	});

	test('Alerts children have correct titles', () => {
		wrapper = shallow(<Alert alerts={WeatherData.alerts} />);
		expect(wrapper.childAt(0).prop('title')).toBe('Special Weather Statement');
		expect(wrapper.childAt(0).prop('url')).toBe(
			'https://alerts.weather.gov/cap/wwacapget.php?x=WA125CE6AA5974.SpecialWeatherStatement.125CE6C59680WA.SEWSPSSEW.933a8d8d4ba4229b37ce05de2f8b11bb'
		);

		expect(wrapper.childAt(1).prop('title')).toBe('Test Data');
		expect(wrapper.childAt(1).prop('url')).toBe('https://test.data');
	});
});
