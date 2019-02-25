import React from 'react';
import { shallow, mount } from 'enzyme';
import HourlyForecast, {
	generateHourlyTickMarks,
	generateHourlyForecastBar
} from './hourlyforecast';
import { WeatherData } from '../__test_data__';

describe('Render HourlyForecast', () => {
	test('Render HourlyForecast', () => {
		const wrapper = shallow(<HourlyForecast hourly={WeatherData.hourly} />);
		expect(wrapper.exists()).toBe(true);
	});
});

describe('Test generation functions', () => {
	test('generateHourlyForcastBar returns the correct number of sections', () => {
		let forcastBar = generateHourlyForecastBar(WeatherData.hourly.data);
		expect(forcastBar.length).toBe(2);
		expect(forcastBar[0].props['aria-label']).toBe('Light Rain');
		expect(forcastBar[1].props['aria-label']).toBe('Overcast');

		forcastBar = generateHourlyForecastBar(WeatherData.hourly.data, 48);
		expect(forcastBar.length).toBe(8);
	});

	test('generateHourlyForcastBar throws correct error', () => {
		expect(() => generateHourlyForecastBar(WeatherData.hourly.data, 0)).toThrow(
			Error('Cannot generate a forecast bar that is less than 1 hour')
		);
		expect(() =>
			generateHourlyForecastBar(WeatherData.hourly.data, 100)
		).toThrow(
			Error('Cannot generate a 100 hour forecast bar, data is of length 49')
		);
	});

	test('generateHourlyTickMarks returns correct number of ticks', () => {
		let tickMarks = generateHourlyTickMarks();
		expect(tickMarks.length).toBe(12);

		tickMarks = generateHourlyTickMarks(24);
		expect(tickMarks.length).toBe(24);
	});
});

describe('HourlyForcast renders content correctly', () => {
	const wrapper = shallow(<HourlyForecast hourly={WeatherData.hourly} />);

	test('Summary rendered correctly', () => {
		expect(wrapper.childAt(0).text()).toBe('Rain throughout the day.');
	});

	test('Hourly forcast is correctly rendered', () => {
		let hourly = wrapper.childAt(1);
		expect(hourly.children().length).toBe(5);
		expect(hourly.childAt(0).prop('aria-label')).toBe('Light Rain');
		expect(hourly.childAt(1).prop('aria-label')).toBe('Overcast');
		expect(hourly.childAt(2).prop('aria-label')).toBe('Mostly Cloudy');
		expect(hourly.childAt(3).prop('aria-label')).toBe('Mostly Cloudy');
		expect(hourly.childAt(4).prop('aria-label')).toBe('Overcast');
	});

	test('Correct number of hourly tickmarks are rendered', () => {
		let ticks = wrapper.childAt(2);
		expect(ticks.children().length).toBe(24);
	});

	test('When disableSummary is set, summary does not appear', () => {
		expect(wrapper.childAt(0).prop('className')).toBe(
			'hourly-forecast-summary'
		);
		const noSummary = shallow(
			<HourlyForecast disableSummary hourly={WeatherData.hourly} />
		);
		expect(noSummary.childAt(0).prop('className')).not.toBe(
			'hourly-forecast-summary'
		);
	});
});
