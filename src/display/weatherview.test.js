import React from 'react';
import { shallow } from 'enzyme';
import WeatherView from './weatherview';
import Alert from '../alert/alert';
import CurrentCard from '../current/currentcard';
import HourlyForcast from '../hourly/hourlyforecast';
import { WeatherData } from '../__test_data__';

describe('Render WeatherView', () => {
	let wrapper;

	test('Render WeatherView', () => {
		wrapper = shallow(<WeatherView data={WeatherData} />);
		expect(wrapper.exists()).toBe(true);
	});

	test('Render Alert Correctly', () => {
		wrapper = shallow(<WeatherView data={WeatherData} />);
		expect(wrapper.childAt(0).type()).toBe(Alert);
	});

	test('Render Current Card Correctly', () => {
		wrapper = shallow(<WeatherView data={WeatherData} />);
		expect(wrapper.childAt(1).type()).toBe(CurrentCard);
	});

	test('Render HourlyForcast Correctly', () => {
		wrapper = shallow(<WeatherView data={WeatherData} />);
		expect(wrapper.childAt(2).type()).toBe(HourlyForcast);
	});

	test('No Data', () => {
		wrapper = shallow(<WeatherView data={{}} />);
		expect(wrapper.text()).toBe(' No Data ');
	});
});
