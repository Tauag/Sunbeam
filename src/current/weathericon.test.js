import React from 'react';
import { shallow } from 'enzyme';
import WeatherIcon from './weathericon';
import * as Weather from '../icons/weatherstate';

describe('Render WeatherIcon', () => {
	const wrapper = shallow(<WeatherIcon />);

	test('Render WeatherIcon', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

describe('Render every possible icon', () => {
	let wrapper;

	test('Render Clear Day', () => {
		wrapper = shallow(<WeatherIcon />).dive();
		expect(wrapper.props().src).toBe(Weather.ClearDay);
	});

	test('Render Clear Night', () => {
		wrapper = shallow(<WeatherIcon icon="clear-night" />).dive();
		expect(wrapper.props().src).toBe(Weather.ClearNight);
	});

	test('Render Rain', () => {
		wrapper = shallow(<WeatherIcon icon="rain" />).dive();
		expect(wrapper.props().src).toBe(Weather.Rainy);
	});

	test('Render Snow', () => {
		wrapper = shallow(<WeatherIcon icon="snow" />).dive();
		expect(wrapper.props().src).toBe(Weather.Snowy);
	});

	test('Render Sleet', () => {
		wrapper = shallow(<WeatherIcon icon="sleet" />).dive();
		expect(wrapper.props().src).toBe(Weather.Sleet);
	});

	test('Render Wind', () => {
		wrapper = shallow(<WeatherIcon icon="wind" />).dive();
		expect(wrapper.props().src).toBe(Weather.Windy);
	});

	test('Render Fog', () => {
		wrapper = shallow(<WeatherIcon icon="fog" />).dive();
		expect(wrapper.props().src).toBe(Weather.Foggy);
	});

	test('Render Cloudy', () => {
		wrapper = shallow(<WeatherIcon icon="cloudy" />).dive();
		expect(wrapper.props().src).toBe(Weather.Cloudy);
	});

	test('Render Partly Cloudy Day', () => {
		wrapper = shallow(<WeatherIcon icon="partly-cloudy-day" />).dive();
		expect(wrapper.props().src).toBe(Weather.PartlyCloudyDay);
	});

	test('Render Partly Cloudy Night', () => {
		wrapper = shallow(<WeatherIcon icon="partly-cloudy-night" />).dive();
		expect(wrapper.props().src).toBe(Weather.PartlyCloudyNight);
	});

	test('Render Hail', () => {
		wrapper = shallow(<WeatherIcon icon="hail" />).dive();
		expect(wrapper.props().src).toBe(Weather.Hail);
	});

	test('Render Thunderstorm', () => {
		wrapper = shallow(<WeatherIcon icon="thunderstorm" />).dive();
		expect(wrapper.props().src).toBe(Weather.Thunderstorm);
	});

	test('Render Tornado', () => {
		wrapper = shallow(<WeatherIcon icon="tornado" />).dive();
		expect(wrapper.props().src).toBe(Weather.Tornado);
	});

	test('Throw Error', () => {
		expect(() => shallow(<WeatherIcon icon="error" />)).toThrow(
			Error('error is not a supported Weather Type')
		);
	});
});
