import React from 'react';
import { shallow } from 'enzyme';
import WeatherView from './weatherview';
import CurrentCard from '../current/currentcard';
import { WeatherData } from '../__test_data__';

describe('Render WeatherView', () => {
	let wrapper;

	test('Render WeatherView', () => {
		wrapper = shallow(<WeatherView data={WeatherData} />);
		expect(wrapper.exists()).toBe(true);
	});

	test('Render Current Card Correctly', () => {
		wrapper = shallow(<WeatherView data={WeatherData} />);
		expect(wrapper.childAt(0).type()).toBe(CurrentCard);
	});

	test('No Data', () => {
		wrapper = shallow(<WeatherView data={{}} />);
		expect(wrapper.text()).toBe(' No Data ');
	});
});
