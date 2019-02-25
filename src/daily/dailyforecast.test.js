import React from 'react';
import { shallow, mount } from 'enzyme';
import DailyForecast, {
	generateDailyForecast,
	getDay,
	DailyContainer
} from './dailyforecast';
import { WeatherData } from '../__test_data__';

describe('Render DailyForecast and DailyWeather', () => {
	test('Render DailyForecast', () => {
		const wrapper = shallow(<DailyForecast daily={WeatherData.daily} />);
		expect(wrapper.exists()).toBe(true);
	});

	// test('Render DailyContainer', () => {
	// 	const wrapper = mount(
	// 		<DailyContainer day={WeatherData.daily.data[0]} />
	// 	);
	// 	expect(wrapper.exists()).toBe(true);
	// });
});

describe('Test DailyForecast has rendered correctly', () => {
	const wrapper = shallow(<DailyForecast daily={WeatherData.daily} />);

	test('Contains the correct amount of DailyContainers', () => {
		expect(wrapper.children()).toHaveLength(7);
		wrapper.map((child, index) => {
			expect(child.prop('data')).toBe(WeatherData.daily[index]);
		});
	});
});

/* Cannot Run this test until Hooks is supported
describe('Test DailyContainer has rendered correctly', () => {
	const wrapper = shallow(<DailyContainer data={WeatherData.daily.data[0]} />);

	test('Test if img is correct', () => {
		expect(wrapper.find('.daily-forecast-img').prop('alt')).toBe('rain');
	});

	test('Test day', () => {
		expect(wrapper.find('.daily-forecast-day').text()).toBe('Wed');
	});

	test('Check the temperature', () => {
		const temps = wrapper.find('.daily-forecast-detail-text');
		expect(temps).toHaveLength(2);
		expect(temps.first().text()).toBe('35\u00b0');
		expect(temps.at(1).text()).toBe('44\u00b0');
	});
});
*/

describe('Test generator and support functions', () => {
	test('Test generator function', () => {
		var container = generateDailyForecast(WeatherData.daily.data, 1);
		expect(container).toHaveLength(1);

		container = generateDailyForecast(WeatherData.daily.data);
		expect(container).toHaveLength(7);
	});

	test('Test getDay Function', () => {
		var testDay = getDay(1549810800);
		expect(testDay).toBe('Sun');

		testDay = getDay(1549897200);
		expect(testDay).toBe('Mon');

		testDay = getDay(1549983600);
		expect(testDay).toBe('Tue');

		testDay = getDay(1550070000);
		expect(testDay).toBe('Wed');

		testDay = getDay(1550156400);
		expect(testDay).toBe('Thu');

		testDay = getDay(1550242800);
		expect(testDay).toBe('Fri');

		testDay = getDay(1550329200);
		expect(testDay).toBe('Sat');
	});
});
